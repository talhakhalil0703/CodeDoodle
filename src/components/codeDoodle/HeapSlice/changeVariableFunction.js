export default function changeVariableFunction(state, action) {
    console.log("Handle Variable Change Heap Redux");
  
    const { var_id, name, val, ret, arrows } = action.payload;

    state.heap[var_id].name = name;
    state.heap[var_id].value = val;
    state.heap[var_id].return = ret;
    state.heap[var_id].arrows = arrows;
  }
  