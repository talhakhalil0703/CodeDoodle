import UniqueId from "../UniqueId";
import React from "react";

export default function addVarToHalfFrameFunction(state, action) {
  let text = action.payload.text;
  let id = action.payload.halfFrame.id;
  let val = action.payload.halfFrame.value;
  let classId = action.payload.halfFrame.classId;
  alert(`classId: ${classId}`);

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
    let classId = UniqueId();
    let variablesWithUniqueIDs = the_class.variables.map((variable) => {
      var { type, name, value } = variable;
      let variableWithUniqueID = {
        type,
        name,
        value,
        variableID: UniqueId(),
        classId, //Used for later when inserting items into the class
      };
      return variableWithUniqueID;
    });

    new_var = {
      variableID: classId, // Defining class here
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
}
