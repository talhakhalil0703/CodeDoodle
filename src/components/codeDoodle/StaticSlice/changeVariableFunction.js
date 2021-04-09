export default function changeVariableFunction(state, action) {
    console.log("Handle Variable Change Static Redux");
  
    const {
      var_id,
      name,
      val,
      ret,
      arrows
    } = action.payload;

    state.stat[var_id].name = name;
    state.stat[var_id].value = val;
    state.stat[var_id].return = ret;
    state.stat[var_id].arrows = arrows;
  }
  