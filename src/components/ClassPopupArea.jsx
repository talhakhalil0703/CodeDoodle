import React, { useState } from "react";
import "./ClassPopupArea.css";
import "../GeneralDiagrams/HandDrawnBoxes.css";
import Popup from "reactjs-popup";
import DrawingIcons from "./DrawingIcons";
import ObjectFrame from "../ARdiagram/shapes/ObjectFrame";
import { selectClasses, updateClasses } from "./codeDoodle/classSlice";
import { useSelector, useDispatch } from "react-redux";
import UniqueId from "./codeDoodle/UniqueId";
const ClassPopupArea = (props) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [variables, setVariables] = useState([]);
  const [name, setName] = useState("Unnamed");

  const classes = useSelector(selectClasses);
  const dispatch = useDispatch();

  const setOpen = () => {
    setPopupOpen(true);
  };

  const onModalClose = () => {
    setPopupOpen(false);
  };

  const saveQuit = () => {
    console.log("saving");
    var classId = UniqueId();

    var newVariables = variables.map((v) => {
      v.classId = classId;
      return v;
    });

    var newClassItem = {
      name: name,
      variableID: classId,
      variables: newVariables,
      type: "class",
    };

    setVariables([]);
    setName("Unnamed");

    dispatch(updateClasses(newClassItem));

    onModalClose();
  };

  const handleClass = (vars, text) => {
    console.log("Classes Popup");
    console.log(vars);
    console.log(text);

    var primitives = ["int", "double", "boolean", "float", "char"];
    // var name = String.fromCharCode("a".charCodeAt(0) + val.length);
    var new_var;
    if (text === "stack") {
      alert("stack frames cant be dropped here...");
    } else if (text === "array") {
      new_var = {
        variableID: UniqueId(),
        type: text,
        name: "testname",
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
    }
    // else if (!primitives.includes(text)) {
    //   var the_class = classes.find((item) => item.name === text);

    //   new_var = {
    //     variableID: varID,
    //     type: the_class.name,
    //     name: name,
    //     value: the_class.variables,
    //     return: "",
    //   };
    // }
    else {
      new_var = {
        variableID: UniqueId(),
        type: text,
        name: "name",
        value: "???",
        return: "",
      };
    }

    setVariables([...variables, new_var]);
  };

  const handleClassNameChange = (newName) => {
    if (newName.length > 0) {
      newName = newName.replace(/^./, newName[0].toUpperCase());
    }

    setName(newName);
  };

  return (
    <li>
      <button
        type="button"
        className="newClassButton"
        onClick={() => setOpen()}
      >
        new class
      </button>

      <div className="popup-container">
        <Popup open={popupOpen} modal closeOnDocumentClick={false}>
          <div id="modal">
            <div id="ClassPopup-container">
              <div id="ClassPopup_ExitButton-container">
                <button
                  className="close modalCloseButton"
                  onClick={() => onModalClose()}
                >
                  &times;
                </button>
              </div>

              <div id="ClassPopup_Object-Container">
                <h3>Define a class</h3>
                <div id="ClassPopup_ObjectBox-Container">
                  <ObjectFrame
                    id={"CustomClassCreationObject"}
                    value={variables}
                    classes={classes}
                    handleDrop={(vars, text) => handleClass(vars, text)}
                    handleChange={(vars, text) => handleClass(vars, text)}
                    name={name}
                    onNameChange={(name) => handleClassNameChange(name)}
                  />
                </div>

                <button className="saveClassButton" onClick={() => saveQuit()}>
                  Save
                </button>
              </div>

              <div id="ClassPopup_Dropbar-Container">
                <DrawingIcons
                  onClassListChange={props.onClassListChange}
                  showButton={false}
                />
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </li>
  );
};

export default ClassPopupArea;
