import React, { Component } from 'react';
import './DrawingIcons.css';
import ClassList from "./ClassList"

class DrawingIcons extends Component {
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
                    <ClassList showButton={true}/>
                </ul>
            </div>
        );
    }
}

export default DrawingIcons;