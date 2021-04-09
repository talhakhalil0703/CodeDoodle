import UniqueId from "../UniqueId";

export default function addVarArray(state, action) {
    
    var {text, values} = action.payload;

    var unique = UniqueId();

    state.stat[values.variableID].elements++;
    var name = state.stat[values.variableID].elements;

    console.log(name);
    var new_var = {
        variableID: unique,
        rend: text,
        type: '',
        name: name,
        value: "'\\0'",
        arrows: [],
        return: null,
      };

    state.stat[values.variableID].value[unique] = new_var;   
}
  