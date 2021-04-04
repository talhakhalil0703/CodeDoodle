import React, { Component } from 'react';
import './DrawingPanel.css';
import StackFrame from '../ARdiagram/shapes/StackFrame';
import DrawingIcons from './DrawingIcons';

class DrawingPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stacks: []
        }

        this.dropRef = React.createRef();
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    componentDidMount() {
        const drop = this.dropRef.current;
        drop.addEventListener('dragover', this.handleDragOver);
        drop.addEventListener('drop', this.handleDrop);
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();

        var text = e.dataTransfer.getData('Text');

        if (text !== 'stack') {
            alert('only stack frames can be dropped here...')
        } else {
            console.log(text);

            var st = this.state.stacks;
            var new_frame = {
                name: 'untitled'
            };

            st.push(new_frame);

            this.setState(state => ({
                stacks: st
            }));
        }
    }

    handleDrag(e) {
        e.dataTransfer.setData('Text', e.target.id);
    }

    render() {
        const { stacks } = this.state;
        return (
            <div ref={this.dropRef} className='drawing-area'>

                <DrawingIcons />

                <ul>
                    {stacks.map((stack, index) => {
                        return (
                            <li key={index}>
                                <StackFrame
                                    name={stack.name}
                                />
                            </li>
                        );
                    })}
                </ul>

            </div>
        );
    }
}

export default DrawingPanel;