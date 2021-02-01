import gdb
import subprocess


class Test (gdb.Command):
    "Parse Program Memory"

    def __init__(self):
        super(Test, self).__init__(
            "test", gdb.COMMAND_SUPPORT, gdb.COMPLETE_NONE, True)

    def invoke(self, arg, from_tty):
        p1 = subprocess.Popen(
            ['cat', '/proc/263/maps'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        (output, err) = p1.communicate()
        p_status = p1.wait()
        print(output.splitlines()[0])


Test()
