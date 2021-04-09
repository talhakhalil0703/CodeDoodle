import UniqueId from "../UniqueId";

export default function addVarToHalfFrameFunction(state, action) {
  let text = action.payload.text;
  let id = action.payload.halfFrame.id;
  let val = action.payload.halfFrame.value;
  let arrows = action.payload.halfFrame.arrows;
  let classId = action.payload.halfFrame.classId;
  var classes = action.payload.halfFrame.classes;

  var unique = UniqueId();

  var primitives = ["int", "double", "boolean", "float", "char", "pointer"];
  var name = String.fromCharCode("a".charCodeAt(0) + unique);

  if (text) {
    if (text === "stack") {
      alert("stack frames cant be dropped here...");
    } else if (text === "array") {
      var new_unique = UniqueId();
      var new_var = {
        variableID: unique,
        type: text,
        name: name,
        arrows: [],
        elements: 0,
            value: [
                  {
                    variableID: new_unique,
                    rend: 'char',
                    type: '',
                    name: '0',
                    value: "'\\0'",
                    arrows: [],
                    return: null,
                  }
            ]
            }
    } else if (!primitives.includes(text)) {
      var the_class = classes.find((item) => item.name === text);
      console.log(action.payload);
      let classId = unique;
      let variablesWithUniqueIDs = the_class.variables.map((variable) => {
        var { type, name, value } = variable;
        let variableWithUniqueID = {
          type,
          name,
          value,
          arrows: [],
          variableID: unique,
          classId, //Used for later when inserting items into the class
        };
        return variableWithUniqueID;
      });

      new_var = {
        variableID: classId, // Defining class here
        type: the_class.name,
        name: name,
        arrows: [],
        value: variablesWithUniqueIDs,
        return: "",
      };
    } else {
      new_var = {
        variableID: unique,
        type: text,
        name: name,
        arrows: [],
        value: "???",
        return: "",
      };
    }

    if (action.payload.halfFrame.name === "Local") {
      state.stack[id].local[unique] = new_var;
    } else if (action.payload.halfFrame.name === "Arguments") {
      state.stack[id].args[unique] = new_var;
    }
  }
}
