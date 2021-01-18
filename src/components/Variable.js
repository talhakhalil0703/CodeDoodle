import React, { Component } from 'react';
import './Variable.css';

class Variable extends Component {

    render() {
        return (
            <div className='variable'>
                {`${this.props.type} ${this.props.name}`}
                <textarea className='var-value' value={this.props.value} />
            </div>
        );
    }
}

export default Variable;