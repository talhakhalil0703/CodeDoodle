export default function changeVariableFunction(state, action) {
  console.log("Handle Variable Change Stack Redux");
  console.log(action);

  const {
    variableID,
    variableName,
    variableValue,
    variableReturn,
    halfFrameType,
  } = action.payload;

  if (halfFrameType === "Local") {
    // if in local
    state.stack.map((stackFrame) => {
      stackFrame.local.map((variable) => {
        if (variable.variableID === variableID) {
          variable.name = variableName;
          variable.return = variableReturn;
          variable.value = variableValue;
        }
        return variable;
      });
      return stackFrame;
    });
  } else {
    //if in args
    state.stack.map((stackFrame) => {
      stackFrame.args.map((variable) => {
        if (variable.variableID === variableID) {
          variable.name = variableName;
          variable.return = variableReturn;
          variable.value = variableValue;
        }
        return variable;
      });
      return stackFrame;
    });
  }
}
