export default function changeClassVariableFunction(state, action) {
  let { value, classVariableID, variableID } = action.payload;
  //if in local
  state.stack.map((stackFrame) => {
    stackFrame.local.map((variables) => {
      if (variables.variableID === classVariableID) {
        variables.value.map((variable) => {
          if (variable.variableID === variableID) {
            variable.name = value.name;
            variable.value = value.value;
          }
          return variable;
        });
      }
      return variables;
    });

    return stackFrame;
  });
  //If in arguments
  state.stack.map((stackFrame) => {
    stackFrame.args.map((variables) => {
      if (variables.variableID === classVariableID) {
        variables.value.map((variable) => {
          if (variable.variableID === variableID) {
            variable.name = value.name;
            variable.value = value.value;
          }
          return variable;
        });
      }
      return variables;
    });

    return stackFrame;
  });
}
