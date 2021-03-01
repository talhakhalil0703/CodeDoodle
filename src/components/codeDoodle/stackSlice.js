import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import UniqueId from "./UniqueId";

export const stackSlice = createSlice({
  name: "stack",
  initialState: {
    stack: [],
    test: [],
  },
  reducers: {
    updateStack: (state, action) => {
      console.log(action.payload);
      state.stack = action.payload;
    },
    addStackFrame: (state) => {
      var name = "void untitled";

      if (state.stack.length === 0) {
        name = "int main";
      }

      var new_frame = {
        index: state.stack.length,
        name: name,
        local: [],
        args: [],
      };

      state.stack.push(new_frame);
    },
    addVarToHalfFrame: (state, action) => {
      let text = action.payload.text;
      let id = action.payload.halfFrame.id;
      let val = action.payload.halfFrame.value;
      var classes = action.payload.halfFrame.classes;

      var primitives = ["int", "double", "boolean", "float", "char"];
      var name = String.fromCharCode("a".charCodeAt(0) + val.length);

      if (text === "stack") {
        alert("stack frames cant be dropped here...");
      } else if (text === "array") {
        var new_var = {
          variableID: UniqueId(),
          type: text,
          name: name,
          value: {
            array: [
              [
                {
                  elementID: UniqueId(),
                  elementValue: " ",
                },
              ],
            ],
          },
        };
      } else if (!primitives.includes(text)) {
        var the_class = classes.find((item) => item.name === text);
        console.log(action.payload);

        let variablesWithUniqueIDs = the_class.variables.map((variable) => {
          var { type, name, value } = variable;
          let variableWithUniqueID = {
            type,
            name,
            value,
            variableID: UniqueId(),
          };
          return variableWithUniqueID;
        });

        new_var = {
          variableID: UniqueId(),
          type: the_class.name,
          name: name,
          value: variablesWithUniqueIDs,
          return: "",
        };
      } else {
        new_var = {
          variableID: UniqueId(),
          type: text,
          name: name,
          value: "???",
          return: "",
        };
      }

      if (action.payload.halfFrame.name === "Local") {
        state.stack[id].local.push(new_var);
      } else if (action.payload.halfFrame.name === "Arguments") {
        state.stack[id].args.push(new_var);
      }
    },
    addVarToArray: (state, action) => {
      let props = action.payload.props;
      let variableID = action.payload.props.variableID;
      let dropType = action.payload.text;
      let index = action.payload.index;
      var primitives = ["int", "double", "boolean", "float", "char"];

      if (primitives.includes(dropType)) {
        state.stack.map((stackFrame) => {
          stackFrame.local.map((variable) => {
            //local
            if (variable.variableID === variableID) {
              variable.value.array[index] = [
                ...props.value.array[index],
                { elementID: UniqueId(), elementValue: " " },
              ];
            }
            return variable;
          });
          stackFrame.args.map((variable) => {
            //args
            if (variable.variableID === variableID) {
              variable.value.array[index] = [
                ...props.value.array[index],
                { elementID: UniqueId(), elementValue: " " },
              ];
            }
            return variable;
          });
          return stackFrame;
        });
      } else if (dropType === "array") {
        state.stack.map((stackFrame) => {
          //local
          stackFrame.local.map((variable) => {
            if (variable.variableID === variableID) {
              variable.value.array = [
                ...props.value.array,
                [{ elementID: UniqueId(), elementValue: " " }],
              ];
            }
            return variable;
          });
          stackFrame.args.map((variable) => {
            //args
            if (variable.variableID === variableID) {
              variable.value.array = [
                ...props.value.array,
                [{ elementID: UniqueId(), elementValue: " " }],
              ];
            }
            return variable;
          });
          return stackFrame;
        });
      }
    },
    handleVariableChange: (state, action) => {
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
    },
    changeArrayVariable: (state, action) => {
      let {
        value,
        arrayVariableID,
        variableID,
        removeElement,
      } = action.payload;
      //if in local
      state.stack.map((stackFrame) => {
        stackFrame.local.map((variable) => {
          if (variable.variableID === arrayVariableID) {
            variable.value.array.map((array) => {
              if (removeElement) {
                return array.filter(
                  (element) => element.elementID !== variableID
                );
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
                array = array.filter(
                  (element) => element.elementID !== variableID
                );
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
    },
    changeClassVariable: (state, action) => {
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
    },
  },
});

// {value, arrayVariableID, variableID}

// above is reducer functions, below is the actions.
export const {
  updateStack,
  addStackFrame,
  addVarToHalfFrame,
  addVarToArray,
  handleVariableChange,
  changeArrayVariable,
  changeClassVariable,
} = stackSlice.actions;

//Hand off the state here
export const selectStack = (state) => state.stack.stack;

// imported by the store
export default stackSlice.reducer;
