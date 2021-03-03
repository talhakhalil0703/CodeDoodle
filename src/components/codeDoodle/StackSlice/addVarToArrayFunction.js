import UniqueId from "../UniqueId";

export default function addVarToArray (state, action) {
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
  }