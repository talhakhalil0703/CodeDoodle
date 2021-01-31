import React, { Component } from 'react';
import './StackFrame.css';
import Variable from '../components/Variable';

class StackFrameSection extends Component {

    constructor(props) {
        super(props);

        this.handleVarChange = this.handleVarChange.bind(this);
    }

    getDefaultName(c, length) {
        return String.fromCharCode(c.charCodeAt(0) + length);
    }

    handleDrop(text, value) {

        var val = value;

        if (text === 'stack') {
            alert('stack frames cant be dropped here...')
        } else {

            var name = this.getDefaultName('a', val.length);

            var new_var = {
                type: text,
                name: name,
                value: '???'
            };

            val.push(new_var);
        }
        return val;
    }

    handleVarChange(var_id, name, val) {
        var value = this.props.value;

        value[var_id].name = name;
        value[var_id].value = val;

        this.props.handleChange(value);
    }

    render() {
        const { value } = this.props;
        return (
            <ul>
                {value.map((variable, index) => {
                    return (
                        <li key={index}>
                            <Variable
                                id={index}
                                type={variable.type}
                                name={variable.name}
                                value={variable.value}
                                onChange={this.handleVarChange}
                            />
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default StackFrameSection;