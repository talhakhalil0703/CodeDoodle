import gdb
import re
import subprocess
import math
import json

# Server Passes filename, vpid
# valgrind --vgdb-error=0 --tool=memcheck --leak-check=full "NOF"
# p (char) *address for character at address


class MemoryParse (gdb.Command):
    "Parse Program Memory"

    def __init__(self):
        super(MemoryParse, self).__init__(
            "memparse", gdb.COMMAND_SUPPORT, gdb.COMPLETE_NONE, True)
        self.static_addrs = []
        self.block_addrs = []
        self.sp = 0
        self.stack = []
        self.heap = []
        self.static = []
        self.used_heap_blocks = {}
        self.staticvars = set()
        self.quit = False
        self.output = []

    def clear_mvars(self):
        self.static_addrs = []
        self.block_addrs = []
        self.sp = 0
        self.stack = []
        self.heap = []
        self.static = []
        self.used_heap_blocks = {}
        self.staticvars = set()
        self.quit = False

    def invoke(self, arg, from_tty):
        gdb.execute("set print repeats 0")
        gdb.execute("set pagination off")
        gdb.execute("break main")
        gdb.execute("continue")
        for i in range(1000):
            self.clear_mvars()

            gdb.execute("step")

            line_number = self.parse_line()

            self.static_addrs = self.get_string_address_space()
            self.block_addrs = self.get_heap_blocks()

            for str in self.static_addrs:
                # Make more useful ie: array of chars
                self.static.append(self.array_parse(str[0], str[1]-str[0]))

            self.sp = stack_pointer = int(gdb.execute(
                "print $sp", to_string=True).split()[-1], 0)

            self.parse_frames()
            self.output.append({"line": line_number, "stack": self.stack,
                                "heap": self.heap, "static": self.static})
            if(self.quit == True):
                break

        print("{}{}{}".format("(JSONDUMPSTART)",
                              json.dumps(self.output), "(JSONDUMPEND)"))
        self.output = []
        gdb.execute("quit")

    def parse_line(self):
        return gdb.execute("frame", to_string=True).splitlines()[-1].split()[0]

    def parse_frames(self):
        frame = gdb.selected_frame()
        if("__libc_start_main" in frame.name()):
            self.quit = True
            return
        while frame:
            try:
                block = frame.block()
            except:
                return
            self.parse_block(block, frame)

            frame = frame.older()

    def parse_block(self, block, frame):
        blk = {"identifier": frame.name(), "args": [], "vars": []}
        while block:
            for symbol in block:
                if(symbol.is_argument):
                    blk["args"].append(self.symbol_parse(
                        symbol.name, symbol.value(frame)))
                elif(symbol.is_variable):
                    # Check if in stack.
                    # If address is less than stack pointer then assume it is a global var
                    address = int(
                        str(symbol.value(frame).address).split()[0], 0)
                    static_addr_space = self.get_static_file_address_space()
                    if (static_addr_space[0] <= address <= static_addr_space[1]):
                        if (address not in self.staticvars):
                            self.staticvars.add(address)
                            self.static.append([self.symbol_parse(
                                symbol.name, symbol.value(frame))])

                    else:
                        blk["vars"].append(self.symbol_parse(
                            symbol.name, symbol.value(frame)))

            block = block.superblock
        self.stack.append(blk)

    def symbol_parse(self, name, value):
        try:
            address = int(str(value.address).split()[0], 0)
        except:
            return
        type = value.type
        type_size = type.sizeof
        type_name = type.name
        defined = self.check_vbits(name, address, type_size, type.code)
        v = {"id": address, "identifier": name,
             "size": type_size, "type_name": type_name, "defined": defined}
        if(type.code == gdb.TYPE_CODE_STRUCT):
            fields = type.fields()
            member_values = []
            for field in fields:
                member_values.append(self.symbol_parse(
                    field.name, value[field.name]))
                v["value"] = member_values
                v["type"] = "class"
        elif(type.code == gdb.TYPE_CODE_PTR):
            v["value"] = int(str(value).split()[0], 0)
            v["type"] = "pointer"
            if v["value"] < self.sp:
                h_block = self.in_heap_block(v["value"])
                s_block = self.in_static_block(v["value"])
                if(h_block):
                    self.heap_parse(h_block, type)
                elif(s_block):
                    pass
        elif(type.code == gdb.TYPE_CODE_REF):
            v["id"] = str(int(str(value).replace('@', ''), 0)) + "REF"
            v["value"] = int(str(value).replace('@', ''), 0)
            v["type"] = "reference"
        elif(type.code == gdb.TYPE_CODE_ARRAY):
            v["value"] = self.array_parse(address, type_size, array_type=type)
            v["type"] = "array"
        else:
            if(type_name == "char"):
                v["value"] = str(value).split()[1]
                if(v["value"] == "'\\000'"):
                    v["value"] = "'\\0'"
            else:
                v["value"] = str(value)
                v["type"] = "primative"
        return v

    def array_parse(self, start, size, array_type=None):
        array = []
        if(array_type is None):
            target = gdb.lookup_type("char")
        else:
            target = array_type.target()
        target_size = target.sizeof
        for i in range(start, start + size, target_size):
            v = gdb.Value(i)
            v = v.cast(target.pointer())
            v = v.dereference()
            array.append(self.symbol_parse(i, v))
        return array

    def check_vbits(self, name, address, size, type_code):
        if(type_code == gdb.TYPE_CODE_STRUCT) or (type_code == gdb.TYPE_CODE_ARRAY):
            return None
        definedness = gdb.execute(
            "monitor get_vbits 0x%x %d" % (address, size), to_string=True)
        definedness = re.sub('[\s+]', '', definedness)
        if ('f' in definedness):
            return False
        else:
            return True

    # Check pointers => Use return to compare against pointers outiside of stack pointer
    def get_heap_blocks(self):
        leak_check = gdb.execute("mo leak_check reachable any", to_string=True)
        block_ranges = []
        record_number = 1
        while(True):
            block_record_res = gdb.execute(
                "monitor block_list " + str(record_number), to_string=True)
            if ("invalid loss record nr" in block_record_res):
                break
            else:
                try:
                    address = block_record_res.splitlines()[-1].split()[1]
                    i = address.index("[")
                    start = int(address[:i], 0)
                    size = int(address[i+1:address.index("]")])
                    # print("%d: %d" % (start, size))
                    address_range = (start, start + size - 1, size)
                    block_ranges.append(address_range)
                    record_number += 1
                except:
                    break
        return block_ranges

    def heap_parse(self, h_block, type):
        target = type.target()
        # n_values = h_block/target.sizeof

        if (h_block[0] not in self.used_heap_blocks) or (target.sizeof > self.used_heap_blocks[h_block[0]]):
            self.heap[:] = [x for x in self.heap if (x[0]["id"] != h_block[0])]
            '''
            for i in range(len(self.heap)):


                if (self.heap[i][0]["id"] == h_block[0]):
                    print(self.heap[i])
                    self.heap.remove(i)
                    break
            '''
            self.used_heap_blocks[h_block[0]] = target.sizeof
            group = []
            for i in range(h_block[0], h_block[1]+1, target.sizeof):
                if(i < h_block[1]):
                    v = gdb.Value(i)
                    v = v.cast(type)
                    v = v.dereference()
                    group.append(self.symbol_parse(i, v))
            self.heap.append(group)

    def in_heap_block(self, address):
        for block in self.block_addrs:
            if block[0] <= address <= block[1]:
                return block
        return None

    def in_static_block(self, address):
        for block in self.static_addrs:
            if block[0] <= address <= block[1]:
                return block
        return None

    def get_string_address_space(self):
        string_literals = self.get_strings()
        address_range = self.get_static_file_address_space()
        addr_strings = []
        for string_literal in string_literals:
            output_addresses = gdb.execute(
                "find " + str(address_range[0]) + ", " + str(address_range[1]) + ", \"" + string_literal + "\"", to_string=True)
            output_addresses = output_addresses.splitlines()

            for address in output_addresses:
                if ("pattern" in address.lower()) or ("warning" in address.lower()):
                    continue
                address = int(address, 0)

                ch = ''
                offset = 0
                while(ch != "'\\000'"):
                    res = gdb.execute(
                        "p (char) *" + str(address+offset), to_string=True)
                    res = res.split()
                    ch = res[3]
                    offset += 1

                # Start, End, Size, String
                addr_strings.append(
                    (address, address+offset-1, offset, string_literal))

        return addr_strings

    def get_static_file_address_space(self):
        map_location = '/proc/' + str(vpid) + '/maps'
        p1 = subprocess.Popen(['cat', map_location],
                              stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        (output, err) = p1.communicate()
        exit_code = p1.wait()
        if(exit_code != 0):
            print("cat could not read the process memory mappings")
            return (0, 0)
        else:
            address_blocks = output.splitlines()
            mainfile_address_blocks = []
            for block in address_blocks:
                block = block.decode("utf-8")
                if filename in block:
                    mainfile_address_blocks.append(block)

            block_ranges = []
            for block in mainfile_address_blocks:
                mem_range = block.split()[0]
                block_ranges.append(mem_range)

            start = math.inf
            end = -math.inf
            for mem_range in block_ranges:
                mem_range = mem_range.split('-')
                if (int(mem_range[0], 16) < start):
                    start = (int(mem_range[0], 16))
                if (int(mem_range[1], 16) > end):
                    end = (int(mem_range[1], 16))

            return (start, end)

    def get_strings(self):
        string_literals = []

        with open(filename+'.cpp', "r") as f:
            code = f.read()
            string_literals = re.findall(r'"((?:\\.|[^"\\])*)"', code)
        # print(string_literals)
        return string_literals


MemoryParse()
