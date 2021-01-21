import React from 'react'
import './ClassPopupArea.css'
import '../GeneralDiagrams/HandDrawnBoxes.css'
import Popup from 'reactjs-popup'
import DrawingIcons from './DrawingIcons'
import ObjectFrame from '../ARdiagram/shapes/ObjectFrame'

export default class ClassPopupArea extends React.Component {
    state = {
        popupOpen: false
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

    addNewClassDefinition = (theClass) => {
        console.log("Adding this class")
        this.onModalClose()
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
                                            name={this.state.name}
                                            onNameChange={this.handleNameChange}
                                        />
                                    </div>

                                    <button className="saveClassButton" onClick={this.addNewClassDefinition}>Save</button>
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