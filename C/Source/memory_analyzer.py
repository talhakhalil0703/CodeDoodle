import gdb
import re
import subprocess
import math

# Server Passes filename, vpid
# valgrind --vgdb-error=0 --tool=memcheck --leak-check=full "NOF"
# p (char) *address for character at address


class MemoryParse (gdb.Command):
    "Parse Program Memory"

    def __init__(self):
        super(MemoryParse, self).__init__(
            "memparse", gdb.COMMAND_SUPPORT, gdb.COMPLETE_NONE, True)
        self.sl_addrs = []
        self.block_addrs = []
        self.sp = 0
        self.stack = []
        self.heap = []

    def invoke(self, arg, from_tty):
        self.sl_addrs = self.get_string_address_space()
        self.block_addrs = self.get_heap_blocks()
        gdb.execute("set print repeats 0")
        self.sp = stack_pointer = int(gdb.execute(
            "print $sp", to_string=True).split()[-1], 0)
        self.parse_frames()

    def parse_frames(self):
        frame = gdb.selected_frame()
        while frame:
            block = frame.block()
            self.parse_block(block, frame)

            frame = frame.older()

    def parse_block(self, block, frame):
        blk = {"identifier": [], "args": [], "vars": []}
        while block:
            for symbol in block:
                if(symbol.is_argument):
                    self.symbol_parse(symbol.name, symbol.value(frame))
                elif(symbol.is_variable):
                    self.symbol_parse(symbol.name, symbol.value(frame))
            block = block.superblock

    # TODO add static check and global vars to static
    def symbol_parse(self, name, value):
        address = int(str(value.address), 0)
        type = value.type
        type_size = type.sizeof
        type_name = type.name
        v = {"id": address, "identifier": name,
             "size": type_size, "type_name": type_name}
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
                if(h_block):
                    self.heap_parse(h_block, type)
        elif(type.code == gdb.TYPE_CODE_REF):
            v["value"] = int(str(value).replace('@', ''), 0)
            v["type"] = "reference"
        else:
            v["value"] = str(value)
            v["type"] = "primative"
        return v

    # TODO Add heap thing to heap
    def heap_parse(self, h_block, type):
        n_objects = int(h_block[2]/type.sizeof)
        for i in range(h_block[0], h_block[1]+1, h_block[2]):
            if(h_block[1]+1 - i >= h_block[2]):
                v = gdb.Value(i)
                v = v.cast(type)
                v = v.dereference()
                print(self.symbol_parse(i, v))

    def in_heap_block(self, address):
        for block in self.block_addrs:
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

                # Start, End, String
                addr_strings.append(
                    (address, address+offset-1, string_literal))

                # addr_strings[address] = string_literal

                # offset = 0
                # for ch in string_literal:
                #     addr_strings[address +
                #                  offset] = {"start": address, "offset": offset, "value": ch}
                #     offset += 1
                # addr_strings[address +
                #              offset] = {"start": address, "offset": offset, "value": '\0'}
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

    # Check pointers -=> Use return to compare against pointers outiside of stack pointer
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


MemoryParse()
