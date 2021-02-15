import React from 'react'
import Popup from 'reactjs-popup'

export default class PointerPopupArea extends React.Component {
    state = {
        open: this.props.open
    }

    closeModal = () => {
        this.props.onClose();
    }

    render(){
        return(
            <Popup open={this.state.open} modal closeOnDocumentClick={false}>
                <div id="modal">
                    <div id='PointerPopup_ExitButton-container'>
                                <button className="close modalCloseButton" onClick={this.closeModal}>
                                &times;
                                </button>
                    </div>
                </div>
                <div id="PointerPopup_Object-Conatiner">
                    <h3>Where will the pointer start and end?</h3>

                </div>
            </Popup>
        )
    }
}