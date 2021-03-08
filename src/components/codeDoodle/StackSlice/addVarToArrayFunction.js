import UniqueId from "../UniqueId";
import React from "react";
export default function addVarToArray(state, action) {
  let props = action.payload.props;
  let variableID = action.payload.props.variableID;
  let dropType = action.payload.text;
  let index = action.payload.index;
  var primitives = ["int", "double", "boolean", "float", "char"];
  //Add check to see if this is for a class first.
  let classId = action.payload.props?.classId;
  if (classId === undefined) {
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
  } else {
    //Contained in a class variable first navigate to class then make the appropriate change
    console.log(classId);
    if (primitives.includes(dropType)) {
      state.stack.map((stackFrame) => {
        stackFrame.local.map((cls) => {
          //local
          if (cls.variableID === classId) {
            cls.value.map((variable) => {
              variable.value.array[index] = [
                ...props.value.array[index],
                { elementID: UniqueId(), elementValue: " " },
              ];
              return variable;
            });
          }
          return cls;
        });
        stackFrame.args.map((cls) => {
          //arguments
          if (cls.variableID === classId) {
            cls.value.map((variable) => {
              variable.value.array[index] = [
                ...props.value.array[index],
                { elementID: UniqueId(), elementValue: " " },
              ];
              return variable;
            });
          }
          return cls;
        });
        return stackFrame;
      });
    } else if (dropType === "array") {
      state.stack.map((stackFrame) => {
        stackFrame.local.map((cls) => {
          //local
          if (cls.variableID === classId) {
            cls.value.map((variable) => {
              variable.value.array = [
                ...props.value.array,
                [{ elementID: UniqueId(), elementValue: " " }],
              ];
              return variable;
            });
          }
          return cls;
        });
        stackFrame.args.map((cls) => {
          //args
          if (cls.variableID === classId) {
            cls.value.map((variable) => {
              variable.value.array = [
                ...props.value.array,
                [{ elementID: UniqueId(), elementValue: " " }],
              ];
              return variable;
            });
          }
          return cls;
        });
        return stackFrame;
      });
    }
  }
}
