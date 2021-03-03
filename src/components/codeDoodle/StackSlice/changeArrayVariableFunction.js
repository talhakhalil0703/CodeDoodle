export default function changeArrayVariableFunction(state, action) {
  let { value, arrayVariableID, variableID, removeElement } = action.payload;
  //if in local
  state.stack.map((stackFrame) => {
    stackFrame.local.map((variable) => {
      if (variable.variableID === arrayVariableID) {
        variable.value.array.map((array) => {
          if (removeElement) {
            return array.filter((element) => element.elementID !== variableID);
          } else {
            array.map((element) => {
              if (element.elementID === variableID) {
                element.elementValue = value;
              }
              return element;
            });
          }
          return array;
        });
      }
      return variable;
    });
    //if in arguments
    stackFrame.args.map((variable) => {
      if (variable.variableID === arrayVariableID) {
        variable.value.array.map((array) => {
          if (removeElement) {
            array = array.filter((element) => element.elementID !== variableID);
          } else {
            array.map((element) => {
              if (element.elementID === variableID) {
                element.elementValue = value;
              }
              return element;
            });
          }
          return array;
        });
      }
      return variable;
    });
    return stackFrame;
  });
}
