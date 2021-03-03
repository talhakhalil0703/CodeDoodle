export default function addStackFrame(state) {
  var name = "void untitled";

  if (state.stack.length === 0) {
    name = "int main";
  }

  var new_frame = {
    index: state.stack.length,
    name: name,
    local: [],
    args: [],
  };

  state.stack.push(new_frame);
}
