import gdb
import json
import copy
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


# class StackParse (gdb.Command):
#     "Parse Stack to JSON"

#     def __init__(self):
#         super(StackParse, self).__init__(
#             "stack", gdb.COMMAND_SUPPORT, gdb.COMPLETE_NONE, True)
#         self.heap_upper = 0
#         self.heap_lower = 0
#         self.stack_upper = 0
#         self.stack_lower = 0

#     def stack_parse(self, name, value, object, heap):
#         address = value.address
#         type = value.type
#         if(type.code == gdb.TYPE_CODE_STRUCT):
#             print('{} : {}'.format(name, address))
#             fields = type.fields()
#             object[name] = {}
#             for field in fields:
#                 self.stack_parse(
#                     field.name, value[field.name], object[name], heap)
#         elif(type.code == gdb.TYPE_CODE_PTR):
#             print('{} = {} : {}'.format(name, value, address))
#             object[name] = str(value)
#             pointed_address = int(str(value), 0)
#             if((self.heap_lower <= pointed_address <= self.heap_upper) and (pointed_address != 0)):
#                 heap[str(value)] = {}
#                 heap_object = value.dereference()
#                 self.stack_parse(str(value), heap_object,
#                                  heap[str(value)], heap)
#         else:
#             object[name] = str(value)
#             print('{} = {} : {} : {}'.format(
#                 name, value, address, type.sizeof))

#     def invoke(self, arg, from_tty):
#         procmapping = gdb.execute("info proc mapping", to_string=True)
#         proclines = procmapping.splitlines()
#         for proc in proclines:
#             if "[stack]" in proc:
#                 limits = proc.split()
#                 self.stack_lower = int(limits[0], 0)
#                 self.stack_upper = int(limits[1], 0)
#             elif "[heap]" in proc:
#                 limits = proc.split()
#                 self.heap_lower = int(limits[0], 0)
#                 self.heap_upper = int(limits[1], 0)
#         frame = gdb.selected_frame()
#         heap = []
#         stack = []
#         current_frame_number = 0
#         while frame:
#             print(frame.name())
#             block = frame.block()
#             stack[frame.name()] = {}
#             stack[frame.name()]['args'] = {}
#             stack[frame.name()]['vars'] = {}
#             while block:
#                 for symbol in block:
#                     if(symbol.is_argument):
#                         self.stack_parse(symbol.name, symbol.value(
#                             frame), stack[frame.name()]['args'], heap)
#                     elif(symbol.is_variable):
#                         self.stack_parse(symbol.name, symbol.value(
#                             frame), stack[frame.name()]['vars'], heap)
#                 block = block.superblock
#             frame = frame.older()
#         print(stack)
#         print(heap)


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
        address = int(str(value.address), 0)
        type = value.type
        if(type.code == gdb.TYPE_CODE_STRUCT):
            #print('{} : {}'.format(name, address))
            fields = type.fields()
            object.append({"id": address, "identifier": name, "size": type.sizeof, "type": "class",
                           "value": {"member_values": []}})
            for field in fields:
                self.stack_parse(
                    field.name, value[field.name], object[-1]["value"]["member_values"], heap)
        elif(type.code == gdb.TYPE_CODE_PTR):
            #print('{} = {} : {}'.format(name, value, address))
            object.append(
                {"id": address, "identifier": name, "value": int(str(value), 0), "size": type.sizeof, "type": "pointer"})
            pointed_address = int(str(value), 0)
            if((self.heap_lower <= pointed_address <= self.heap_upper)):
                heap_object = value.dereference()
                self.heap_parse(str(value), heap_object, heap)
        elif(type.code == gdb.TYPE_CODE_REF):
            object.append(
                {"id": address, "identifier": name, "value": int(str(value).replace('@', ''), 0), "size": type.sizeof, "type": "reference"})
        else:
            object.append(
                {"id": address, "identifier": name, "value": str(value), "size": type.sizeof, "type": "primative"})
            # print('{} = {} : {} : {} -> {}'.format(
            #    name, value, address, type.sizeof, type.code))

    def heap_parse(self, name, value, heap):
        address = int(str(value.address), 0)
        type = value.type
        if(type.code == gdb.TYPE_CODE_STRUCT):
            self.ordered_heap_insert(heap, {"id": address, "identifier": name, "size": type.sizeof, "type": "class",
                                            "value": {"member_values": []}})
            fields = type.fields()
            for field in fields:
                self.heap_parse(field.name, value[field.name], heap)
        elif(type.code == gdb.TYPE_CODE_PTR):
            self.ordered_heap_insert(
                heap, {"id": address, "identifier": name, "type": "pointer",
                       "size": type.sizeof, "value": int(str(value), 0)}
            )
        else:
            self.ordered_heap_insert(
                heap, {"id": address, "identifier": name, "type": "primative",
                       "size": type.sizeof, "value": str(value)}
            )

    def ordered_heap_insert(self, heap, element):
        if len(heap) <= 0:
            heap.append(element)
            return
        else:
            for i in range(0, len(heap)-1):
                if (element["id"] == heap[i]["id"]):
                    return
                elif (element["id"] < heap[i+1]["id"] and element["id"] > heap[i]["id"]):
                    heap.insert(element, i+1)
                    return
            heap.append(element)

    def group_heap(self, heap):
        grouped_heap = []
        i = 0
        while(i < len(heap)):
            obj = copy.deepcopy(heap[i])
            grouped_heap.append(obj)
            if(heap[i]["type"] == "class"):
                i += self.group_member_values(heap, i, obj)
            i += 1
        return grouped_heap

    def group_member_values(self, heap, index, object):
        size = 0
        next_index = 0
        while(heap[index]["size"] > size):
            next_index += 1
            next_object = heap[index + next_index]
            size += next_object["size"]
            copied_object = copy.deepcopy(next_object)
            object["value"]["member_values"].append(copied_object)
            if(next_object["type"] == "class"):
                next_index += self.group_member_values(
                    heap, next_index, copied_object)
        return next_index

    def invoke(self, arg, from_tty):
        procmapping = gdb.execute("info proc mapping", to_string=True)
        gdb.execute("set print repeats 0")
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
        heap = []
        stack = []
        while frame:
            print(frame.name())
            block = frame.block()
            stack.append({})
            stack[-1]['identifer'] = frame.name()
            stack[-1]['args'] = []
            stack[-1]['vars'] = []
            while block:
                for symbol in block:
                    if(symbol.is_argument):
                        self.stack_parse(symbol.name, symbol.value(
                            frame), stack[-1]['args'], heap)
                    elif(symbol.is_variable):
                        self.stack_parse(symbol.name, symbol.value(
                            frame), stack[-1]['vars'], heap)
                block = block.superblock
            frame = frame.older()
        organized_heap = self.group_heap(heap)
        # print(stack)
        # print(organized_heap)
        output = {"stack": stack, "heap": organized_heap}
        with open("test.json", "w") as f:
            json.dump(output, f)


StackParse()
