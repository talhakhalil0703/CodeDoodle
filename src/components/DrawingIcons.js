import React, { Component } from 'react';
import './DrawingIcons.css';

/* 
    Component makes up the drawing tools part of the application
    To add more items to the panel add to <ul> in this format:
        
        <li id='your_icon_name' draggable={true} onDragStart={this.handleDrag}>your_icon_name</li>
    
    Receives no props, manages no state
*/
class DrawingIcons extends Component {

    /* 
        sets 'Text' to be equal to the targets id (i.e. if int is dragged, int will be loaded into 'Text'), will be retrieved in StackFrame.js
    */
    handleDrag = (e) => {
        e.dataTransfer.setData('Text', e.target.id);
    }

    render() {
        return (
            <div className='drawing-icons'>
                <ul>
                    <li id='stack' draggable={true} onDragStart={this.handleDrag}>Stack Frame</li>
                    <li id='int' draggable={true} onDragStart={this.handleDrag}>Int</li>
                    <li id='double' draggable={true} onDragStart={this.handleDrag}>Double</li>
                </ul>
            </div>
        );
    }
}

export default DrawingIcons;