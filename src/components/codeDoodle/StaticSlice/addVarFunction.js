import UniqueId from "../UniqueId";

export default function addVar(state, action) {
    

    var text = action.payload.text;

    var unique = UniqueId();
    var classes = action.payload.classes;

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
          let classId = UniqueId();
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
            value: variablesWithUniqueIDs,
            arrows: [],
            return: "",
          };
        } else {
          new_var = {
            variableID: unique,
            type: text,
            name: name,
            value: "???",
            arrows: [],
            return: "",
          };
        }
  
      state.stat[unique] = new_var;
    }
}
  