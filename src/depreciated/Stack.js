import React, { Component } from 'react';

import './DrawingPanel.css';
import StackFrame from './StackFrame';

class Stack extends Component {

    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLocalChange = this.handleLocalChange.bind(this);
        this.handleArgsChange = this.handleArgsChange.bind(this);
    }

    handleDrop(text, stack) {

        var st = stack;

        if (text !== 'stack') {
            alert('only stack frames can be dropped here...')
        } else {

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
        }
        return st;
    }

    handleNameChange(id, name) {

        var value = this.props.value;
        value[id].name = name;

        this.props.handleChange(value);
    }

    handleLocalChange(id, loc) {

        var value = this.props.value;
        value[id].local = loc;

        this.props.handleChange(value);
    }

    handleArgsChange(id, arg) {

        var value = this.props.value;
        value[id].args = arg;

        this.props.handleChange(value);
    }

    render() {
        const { value } = this.props;
        return (
            <div className='stack'>
                <h3>Stack</h3>

                <ul>
                    {value.map((stack, index) => {
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
            </div >
        );
    }
}

export default Stack;