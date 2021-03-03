export default function changeArrayVariableFunction(state, action) {
  const { value, arrayVariableID, variableID, removeElement } = action.payload;
  //if in local
  state.stack.map((stackFrame, stackIndex) => {
    stackFrame.local.map((variable, arrayIndex) => {
      if (variable.variableID === arrayVariableID) {
        variable.value.array.map((array) => {
          console.log("Adding in stack");
          array.map((element, elementIndex) => {
            if (removeElement) {
              state.stack[stackIndex].local[arrayIndex].value.array.splice(
                elementIndex
              );
            }
            if (element.elementID === variableID) {
              element.elementValue = value;
            }
            return element;
          });

          return array;
        });
      }
      return variable;
    });
    //if in arguments
    stackFrame.args.map((variable, arrayIndex) => {
      if (variable.variableID === arrayVariableID) {
        variable.value.array.map((array) => {
          console.log("Adding in stack");
          array.map((element, elementIndex) => {
            if (removeElement) {
              state.stack[stackIndex].args[arrayIndex].value.array.splice(
                elementIndex
              );
            }
            if (element.elementID === variableID) {
              element.elementValue = value;
            }
            return element;
          });

          return array;
        });
      }
      return variable;
    });
    return stackFrame;
  });
}
