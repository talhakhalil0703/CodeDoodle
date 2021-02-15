import React from 'react';
import PointerPopupArea from './PointerPopupArea'

export default class Pointer extends React.Component {
    state = {
        popupOpen:false,
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

    addNewPointer = () => {
        console.log("Adding this pointer")
        this.onModalClose()
    }

    getNewPointer = () => {
        if(this.props.showButton !== false){
            if(this.state.popupOpen){
                return(
                    <li>
                        <button type="button" onClick={this.setOpen}>
                            new pointer
                        </button>
                        <PointerPopupArea open={true} onClose={this.onModalClose}/>
                    </li>
                );
            }else{
                return(
                    <li>
                        <button type="button"  onClick={this.setOpen}>
                            new pointer
                        </button>
                    </li>
                );
            }
        }else{
            return (
                <React.Fragment />
            );
        } 
    }


    render () {
        return(
            <React.Fragment>
                <li id="Pointer_li">
                    <h4>Pointer</h4>
                    <ul id="Pointer_newbutton">
                        <this.getNewPointer />
                    </ul>
                </li>
            </React.Fragment>
        )
    }
}