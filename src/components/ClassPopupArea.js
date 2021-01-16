import React from 'react'
import './ClassPopupArea.css'
import '../GeneralDiagrams/HandDrawnBoxes.css'
import EditableText from '../GeneralDiagrams/EditableText'

export default class ClassPopupArea extends React.Component {
    state = {
        className: "default"
    }

    render() {
        return (
            <div id="customClassCreationContainer">
                <h5>Define a class</h5>
                <div id="classCreationBoxContainer">
                    <EditableText value={this.state.className} editClassName="classCreatorName" />
                    <div className="box2 box"></div>
                </div>
                <button className="saveClass">Save</button>
            </div>
        );
    }
}