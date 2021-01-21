import React, { Component } from 'react';
import './Variable.css';
import EditableText from '../GeneralDiagrams/EditableText'

/* 
    Component that makes up the variables of the application
    Manages no state

    Receives props:
     - id: a unique identifier of this variable
     - name: the name of this variable
     - type: the primitive type of this variable
     - value: the value of this variable
     - onChange: access to ARHalfFrame onChange function (handles variable changes)
*/
class Variable extends Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    /* handles changing the name of a variable */
    handleNameChange(new_name) {
        const { id, value } = this.props;
        this.props.onChange(id, new_name, value);
    }

    /* handles changing the value of a variable */
    handleValueChange(e) {
        const { id, name } = this.props;
        const val = e.target.value;
        this.props.onChange(id, name, val);
    }

    render() {
        return (
            <div className='variable'>
                <div className='var-name'>
                    {`${this.props.type} `}
                    <EditableText onChange={this.handleNameChange} value={this.props.name} editClassName="stackframeName" />
                </div>
                <textarea className='var-value' value={this.props.value} onChange={this.handleValueChange} />
            </div>
        );
    }
}

export default Variable;