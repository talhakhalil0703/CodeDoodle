import gdb

'''
{
    stack: [
        {
            name: main
            args: [
                {
                    name: argc
                    sizeof: 4
                    address: thingy
                }
            ]
        }
    ]

    
}
'''


class StackParse (gdb.Command):
    "Parse Stack to JSON"

    def __init__(self):
        super(StackParse, self).__init__(
            "stack", gdb.COMMAND_SUPPORT, gdb.COMPLETE_NONE, True)
        self.heap_upper = 0
        self.heap_lower = 0
        self.stack_upper = 0
        self.stack_lower = 0

    def stack_parse(self, name, value, object, heap):
        address = value.address
        type = value.type
        if(type.code == gdb.TYPE_CODE_STRUCT):
            print('{} : {}'.format(name, address))
            fields = type.fields()
            object[name] = {}
            for field in fields:
                self.stack_parse(
                    field.name, value[field.name], object[name], heap)
        elif(type.code == gdb.TYPE_CODE_PTR):
            print('{} = {} : {}'.format(name, value, address))
            object[name] = str(value)
            pointed_address = int(str(value), 0)
            if((self.heap_lower <= pointed_address <= self.heap_upper) and (pointed_address != 0)):
                heap[str(value)] = {}
                heap_object = value.dereference()
                self.stack_parse(str(value), heap_object,
                                 heap[str(value)], heap)
        else:
            object[name] = str(value)
            print('{} = {} : {} : {}'.format(
                name, value, address, type.sizeof))

    def invoke(self, arg, from_tty):
        procmapping = gdb.execute("info proc mapping", to_string=True)
        proclines = procmapping.splitlines()
        for proc in proclines:
            if "[stack]" in proc:
                limits = proc.split()
                self.stack_lower = int(limits[0], 0)
                self.stack_upper = int(limits[1], 0)
            elif "[heap]" in proc:
                limits = proc.split()
                self.heap_lower = int(limits[0], 0)
                self.heap_upper = int(limits[1], 0)
        frame = gdb.selected_frame()
        heap = {}
        stack = {}
        while frame:
            print(frame.name())
            block = frame.block()
            stack[frame.name()] = {}
            stack[frame.name()]['args'] = {}
            stack[frame.name()]['vars'] = {}
            while block:
                for symbol in block:
                    if(symbol.is_argument):
                        self.stack_parse(symbol.name, symbol.value(
                            frame), stack[frame.name()]['args'], heap)
                    elif(symbol.is_variable):
                        self.stack_parse(symbol.name, symbol.value(
                            frame), stack[frame.name()]['vars'], heap)
                block = block.superblock
            frame = frame.older()
        print(stack)
        print(heap)


StackParse()
