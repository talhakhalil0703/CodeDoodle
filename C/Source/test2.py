from os import name
import gdb
import subprocess


class Test (gdb.Command):
    "Parse Program Memory"

    def __init__(self):
        super(Test, self).__init__(
            "test", gdb.COMMAND_SUPPORT, gdb.COMPLETE_NONE, True)

    def invoke(self, arg, from_tty):
        hello_type = gdb.lookup_type('Hello')
        hello_value = gdb.parse_and_eval(
            '{a_number = 3000, name = "NAME\\000"}')
        print(hello_value)


Test()
