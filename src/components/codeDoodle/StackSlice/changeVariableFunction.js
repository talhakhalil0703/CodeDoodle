export default function changeVariableFunction(state, action) {

  const { id, var_id, name, val, ret, half_frame, arrows } = action.payload;

  console.log(half_frame);

  if(half_frame === 'Local') {
    console.log(state.stack[id].local[var_id]);
    state.stack[id].local[var_id].name = name;
    state.stack[id].local[var_id].value = val;
    state.stack[id].local[var_id].return = ret;
    state.stack[id].local[var_id].arrows = arrows;
  } else {
    console.log(state.stack[id].args[var_id]);
    state.stack[id].args[var_id].name = name;
    state.stack[id].args[var_id].value = val;
    state.stack[id].args[var_id].return = ret;
    state.stack[id].args[var_id].arrows = arrows;
  }
}
