import React from "react";
import "./ClassPopupArea.css";
import "../GeneralDiagrams/HandDrawnBoxes.css";
import Popup from "reactjs-popup";
import DrawingIcons from "./DrawingIcons";
import ObjectFrame from "../ARdiagram/shapes/ObjectFrame";

export default class ClassPopupArea extends React.Component {
  state = {
    popupOpen: false,
    variables: [],
    name: "Unnamed",
  };

  setOpen = () => {
    this.setState(() => ({
      popupOpen: true,
    }));
  };

  onModalClose = () => {
    this.setState(() => ({
      popupOpen: false,
    }));
  };

  saveQuit = () => {
    console.log("saving");

    var newClassItem = {
      name: this.state.name,
      variables: this.state.variables,
      type: "class",
    };

    this.setState(() => ({
      variables: [],
      name: "Unnamed",
    }));

    var updatedClassList = this.props.classList;
    updatedClassList.push(newClassItem);
    this.props.onClassListChange(updatedClassList);

    this.onModalClose();
  };

  handleClass = (vars, text) => {
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
        variableID: 0,
        type: text,
        name: "testname",
        value: {
          array: [
            [
              {
                elementID: 20,
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
        variableID: 0,
        type: text,
        name: "name",
        value: "???",
        return: "",
      };
    }

    this.setState(() => ({
      variables: [...this.state.variables, new_var],
    }));
  };

  handleClassNameChange = (newName) => {
    if (newName.length > 0) {
      newName = newName.replace(/^./, newName[0].toUpperCase());
    }

    this.setState(() => ({
      name: newName,
    }));
  };

  render() {
    return (
      <li>
        <button type="button" className="newClassButton" onClick={this.setOpen}>
          new class
        </button>

        <div className="popup-container">
          <Popup open={this.state.popupOpen} modal closeOnDocumentClick={false}>
            <div id="modal">
              <div id="ClassPopup-container">
                <div id="ClassPopup_ExitButton-container">
                  <button
                    className="close modalCloseButton"
                    onClick={this.onModalClose}
                  >
                    &times;
                  </button>
                </div>

                <div id="ClassPopup_Object-Container">
                  <h3>Define a class</h3>
                  <div id="ClassPopup_ObjectBox-Container">
                    <ObjectFrame
                      id={"CustomClassCreationObject"}
                      value={this.state.variables}
                      classes={this.props.classList}
                      handleDrop={this.handleClass}
                      handleChange={this.handleClass}
                      name={this.state.name}
                      onNameChange={this.handleClassNameChange}
                    />
                  </div>

                  <button className="saveClassButton" onClick={this.saveQuit}>
                    Save
                  </button>
                </div>

                <div id="ClassPopup_Dropbar-Container">
                  <DrawingIcons
                    onClassListChange={this.props.onClassListChange}
                    classList={this.props.classList}
                    showButton={false}
                  />
                </div>
              </div>
            </div>
          </Popup>
        </div>
      </li>
    );
  }
}
