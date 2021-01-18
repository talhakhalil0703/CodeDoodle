import React, { Component } from 'react';

import './DrawingPanel.css';
import StackFrame from '../components/StackFrame';

class Stack extends Component {

    constructor(props) {
        super(props);

        this.dropRef = React.createRef();
        this.handleDrop = this.handleDrop.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLocalChange = this.handleLocalChange.bind(this);
        this.handleArgsChange = this.handleArgsChange.bind(this);
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

            var st = this.props.stack;
            var name = 'untitled';

            if (st.length === 0) {
                name = 'main';
            }

            var new_frame = {
                name: name,
                local: [],
                args: []
            };

            st.push(new_frame);

            this.props.onStackChange(st);
        }
    }

    handleNameChange(id, name) {

        var frames = this.props.stack;
        frames[id].name = name;

        this.props.onStackChange(frames);
    }

    handleLocalChange(id, loc) {

        var frames = this.props.stack;
        frames[id].local = loc;

        this.props.onStackChange(frames);
    }

    handleArgsChange(id, arg) {

        var frames = this.props.stack;
        frames[id].args = arg;

        this.props.onStackChange(frames);
    }

    render() {
        const { stack } = this.props;
        return (
            <div ref={this.dropRef} className='stack'>

                <h3>Stack</h3>

                <ul>
                    {stack.map((stack, index) => {
                        return (
                            <li key={index}>
                                <StackFrame
                                    id={index}
                                    name={stack.name}
                                    local={stack.local}
                                    args={stack.args}
                                    onNameChange={this.handleNameChange}
                                    onLocalChange={this.handleLocalChange}
                                    onArgsChange={this.handleArgsChange}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default Stack;