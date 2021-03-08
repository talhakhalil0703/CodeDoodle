export default function changeArrayVariableFunction(state, action) {
  const { value, arrayVariableID, variableID, removeElement } = action.payload;
  let classId = action.payload.classId;
  if (classId === undefined) {
    // Not contained within a class
    //if in local
    state.stack.map((stackFrame, stackIndex) => {
      stackFrame.local.map((variable, variableIndex) => {
        if (variable.variableID === arrayVariableID) {
          variable.value.array.map((array, arrayIndex) => {
            console.log("Adding in stack");
            array.map((element, elementIndex) => {
              if (removeElement) {
                state.stack[stackIndex].local[variableIndex].value.array[
                  arrayIndex
                ].splice(elementIndex, 1);
              } else if (element.elementID === variableID) {
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
              } else if (element.elementID === variableID) {
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
  } else {
    //Contained within a class
    state.stack.map((stackFrame, stackIndex) => {
      //Local
      stackFrame.local.map((cls) => {
        if (cls.variableID === classId) {
          cls.value.map((variable) => {
            if (variable.variableID === arrayVariableID) {
              variable.value.array.map((array, arrayIndex) => {
                console.log("Adding in stack");
                array.map((element, elementIndex) => {
                  if (removeElement) {
                    state.stack[stackIndex].args[arrayIndex].value.array.splice(
                      elementIndex
                    );
                  } else if (element.elementID === variableID) {
                    element.elementValue = value;
                  }
                  return element;
                });

                return array;
              });
            }
            return variable;
          });
        }
        return cls;
      });
      stackFrame.args.map((cls) => {
        if (cls.variableID === classId) {
          cls.value.map((variable) => {
            if (variable.variableID === arrayVariableID) {
              variable.value.array.map((array, arrayIndex) => {
                console.log("Adding in stack");
                array.map((element, elementIndex) => {
                  if (removeElement) {
                    state.stack[stackIndex].args[arrayIndex].value.array.splice(
                      elementIndex
                    );
                  } else if (element.elementID === variableID) {
                    element.elementValue = value;
                  }
                  return element;
                });

                return array;
              });
            }
            return variable;
          });
        }
        return cls;
      });
      return stackFrame;
    });
  }
}
