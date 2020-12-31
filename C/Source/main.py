import gdb


def stack_parse(name, value, object):
    address = value.address
    type = value.type
    if(type.code == gdb.TYPE_CODE_STRUCT):
        print('{} : {}'.format(name, address))
        fields = type.fields()
        object[name] = {}
        for field in fields:
            stack_parse(field.name, value[field.name], object[name])
    else:
        object[name] = value
        print('{} = {} : {}'.format(name, value, address))


class SavePrefixCommand (gdb.Command):
    "Prefix command for saving things."

    def __init__(self):
        super(SavePrefixCommand, self).__init__(
            "localvars", gdb.COMMAND_SUPPORT, gdb.COMPLETE_NONE, True)

    def invoke(self, arg, from_tty):
        frame = gdb.selected_frame()
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
                        stack_parse(symbol.name, symbol.value(frame), stack[frame.name()]['args'])
                    elif(symbol.is_variable):
                        stack_parse(symbol.name, symbol.value(frame), stack[frame.name()]['vars'])
                block = block.superblock
            frame = frame.older()
        print(stack)


SavePrefixCommand()
