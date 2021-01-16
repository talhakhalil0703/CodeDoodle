import React from 'react';
import ClassListItem from './ClassListItem'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import ClassPopupArea from './ClassPopupArea'

export default class ClassList extends React.Component {
    state = {
        ClassList: [{name:"float"},{name:"int64_t"}],
        popupOpen: false
    }

    LayoutClasses = () => {
        return(
            <React.Fragment>
                {this.state.ClassList.map(Class =>
                        <ClassListItem name={Class.name} />
                )}
            </ React.Fragment>
        )
    };

    defineNewClass = () => {
        console.log("adding class")
    
        
    }

    closeModal = () => {
        console.log("Closing modal " + this.state.popupOpen)
        this.setState(() => ({
            popupOpen: false
        }));
    }

    getNewClassButton = () => {
        if(this.props.showButton){
            return(
                <li>
                    <Popup trigger={<button> New Class</button>} position="right center" modal closeOnDocumentClick={false} disabled={this.state.popupOpen} open={this.state.popupOpen} onClose={this.closeModal}>
                            <div className="modal">
                                <button className="close modalCloseButton" onClick={this.closeModal}>&times;</button>
                                <ClassPopupArea />
                            </div>
                    </Popup>
                </li>
            );
        }else{
            return (
                <React.Fragment />
            );
        }
    }

    render() {
        return (
            <React.Fragment>
                <li id="ClassList_li">
                    <h4>Classes</h4>
                    <ul id="ClassList_innerlist">
                        <this.LayoutClasses />
                        <this.getNewClassButton />
                    </ ul>
                </li>
            </React.Fragment>
        );
    }
}