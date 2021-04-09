import UniqueId from "../UniqueId";

export default function addVarArray(state, action) {
    
    var {text, values, id, name} = action.payload;

    var unique = UniqueId();

    if(name === 'Local') {
      state.stack[id].local[values.variableID].elements++;
      var var_name = state.stack[id].local[values.variableID].elements;
    } else {
      state.stack[id].args[values.variableID].elements++;
      var var_name = state.stack[id].args[values.variableID].elements;
    }

    var new_var = {
        variableID: unique,
        rend: text,
        type: '',
        name: var_name,
        value: "'\\0'",
        arrows: [],
        return: null,
    };

    if(name === 'Local') {
      state.stack[id].local[values.variableID].value[unique] = new_var;

    } else {
      state.stack[id].args[values.variableID].value[unique] = new_var;
    }
}
  