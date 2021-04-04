import React, { Component } from 'react';
import './StackFrame.css';
import Variable from './Variable';

/*

    Stores variables in stack in form of:

    variable = {
        type: ...,
        name: ...,
        value: ...
    }

*/


class StackFrame extends Component {

    constructor(props) {
        super(props);

        this.handleLocal = this.handleLocal.bind(this);
        this.handleArgs = this.handleArgs.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLocalVarChange = this.handleLocalVarChange.bind(this);
        this.handleArgsVarChange = this.handleArgsVarChange.bind(this);
        this.local = React.createRef();
        this.args = React.createRef();
    }

    componentDidMount() {
        const local = this.local.current;
        local.addEventListener('dragover', this.handleDragOver);
        local.addEventListener('drop', this.handleLocal);

        const args = this.args.current;
        args.addEventListener('dragover', this.handleDragOver);
        args.addEventListener('drop', this.handleArgs);
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    getDefaultName(c, length) {
        return String.fromCharCode(c.charCodeAt(0) + length);
    }

    handleLocal(e) {
        e.preventDefault();
        e.stopPropagation();

        var text = e.dataTransfer.getData('Text');
        const id = this.props.id;

        if (text === 'stack') {
            alert('stack frames cant be dropped here...')
        } else {

            var loc = this.props.local;
            var name = this.getDefaultName('a', loc.length);

            var new_var = {
                type: text,
                name: name,
                value: '???'
            };

            loc.push(new_var);
            this.props.onLocalChange(id, loc);
        }
    }

    handleArgs(e) {
        e.preventDefault();
        e.stopPropagation();

        var text = e.dataTransfer.getData('Text');
        const id = this.props.id;

        if (text === 'stack') {
            alert('stack frames cant be dropped here...')
        } else {

            var arg = this.props.args;
            var name = this.getDefaultName('a', arg.length);

            var new_var = {
                type: text,
                name: name,
                value: '???'
            };

            arg.push(new_var);
            this.props.onArgsChange(id, arg);
        }
    }

    handleNameChange(e) {
        const id = this.props.id;
        const val = e.target.value;
        this.props.onNameChange(id, val);
    }

    handleLocalVarChange(var_id, name, val) {
        const stack_id = this.props.id;
        var loc = this.props.local;

        loc[var_id].name = name;
        loc[var_id].value = val;

        this.props.onLocalChange(stack_id, loc);
    }

    handleArgsVarChange(var_id, name, val) {
        const stack_id = this.props.id;
        var arg = this.props.args;

        arg[var_id].name = name;
        arg[var_id].value = val;

        this.props.onArgsChange(stack_id, arg);
    }

    render() {
        const { name, local, args } = this.props;
        return (
            <div className='stack-frame'>

                <textarea className='stack-name' value={name} onChange={this.handleNameChange} />

                <div ref={this.local} className='local-variables'>
                    <h5>Local</h5>
                    <ul>
                        {local.map((variable, index) => {
                            return (
                                <li key={index}>
                                    <Variable
                                        id={index}
                                        type={variable.type}
                                        name={variable.name}
                                        value={variable.value}
                                        onChange={this.handleLocalVarChange}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div ref={this.args} className='args-variables'>
                    <h5>Args</h5>
                    <ul>
                        {args.map((variable, index) => {
                            return (
                                <li key={index}>
                                    <Variable
                                        id={index}
                                        type={variable.type}
                                        name={variable.name}
                                        value={variable.value}
                                        onChange={this.handleArgsVarChange}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default StackFrame;