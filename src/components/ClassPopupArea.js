import React from 'react'
import './ClassPopupArea.css'
import '../GeneralDiagrams/HandDrawnBoxes.css'
import Popup from 'reactjs-popup'
import DrawingIcons from './DrawingIcons'
import ObjectFrame from '../ARdiagram/shapes/ObjectFrame'

export default class ClassPopupArea extends React.Component {
    state = {
        popupOpen: false,
<<<<<<< HEAD
        variables: [],
        name: "Unnamed",
=======
        variables:[],
        name:"unnamed",
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
    }

    setOpen = () => {
        this.setState(() => ({
            popupOpen: true
        }));
    }

    onModalClose = () => {
        this.setState(() => ({
            popupOpen: false
        }));
    }

    saveQuit = () => {
        console.log("saving")

        var newClassItem = {
<<<<<<< HEAD
            name: this.state.name,
            variables: this.state.variables,
            type: 'class'
        }

        this.setState(() => ({
            variables: [],
            name: "Unnamed",
=======
            name:this.state.name,
            variables:this.state.variables,
            type:"class"
        }

        this.setState(() => ({
            variables:[],
            name:"unnamed",
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
        }));

        var updatedClassList = this.props.classList
        updatedClassList.push(newClassItem)
        this.props.onClassListChange(updatedClassList)

        this.onModalClose()
    }

    handleClass = (vars) => {
        this.setState(() => ({
            variables: vars
        }));
<<<<<<< HEAD
    }

    handleClassNameChange = (newName) => {

        if (newName.length > 0) {
            newName = newName.replace(/^./, newName[0].toUpperCase());
        }

=======
    } 

    handleClassNameChange = (newName) => {
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
        this.setState(() => ({
            name: newName
        }));
    }

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
                                <div id='ClassPopup_ExitButton-container'>
                                    <button className="close modalCloseButton" onClick={this.onModalClose}>
                                        &times;
                                    </button>
                                </div>

                                <div id="ClassPopup_Object-Container">
                                    <h3>Define a class</h3>
                                    <div id="ClassPopup_ObjectBox-Container">
                                        <ObjectFrame
                                            id={"CustomClassCreationObject"}
                                            value={this.state.variables}
<<<<<<< HEAD
                                            classes={this.props.classList}
=======
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
                                            handleDrop={this.handleClass}
                                            handleChange={this.handleClass}
                                            name={this.state.name}
                                            onNameChange={this.handleClassNameChange}
                                        />
                                    </div>

                                    <button className="saveClassButton" onClick={this.saveQuit}>Save</button>
                                </div>

                                <div id="ClassPopup_Dropbar-Container">
                                    <DrawingIcons
<<<<<<< HEAD
                                        onClassListChange={this.props.onClassListChange}
                                        classList={this.props.classList}
=======
                                        onClassListChange={this.props.onClassListChange} 
                                        classList={this.props.classList} 
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
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