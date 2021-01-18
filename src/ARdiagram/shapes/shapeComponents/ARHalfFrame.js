import React from 'react';
import Variable from '../../../components/Variable';

/* 
    Component that makes up half of a stackframe, displays and populates all variables
    Manages no state

    Receives props:
     - name: the name of the half frame (Local or Arguments)
     - value: the variables to be displayed
     - onChange: access to StackFrames onChange function (handles changing variables)
*/
export default class ARHalfFrame extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    /* sends variables information up to StackFrame */
    handleChange(var_id, name, val) {
        this.props.onChange(var_id, name, val);
    }

    render() {
        const { value } = this.props;
        return (
            <div>
                <h3>{this.props.name}</h3>

                <ul className='local-variables'>
                    {value.map((variable, index) => {
                        return (
                            <li key={index}>
                                <Variable
                                    id={index}
                                    type={variable.type}
                                    name={variable.name}
                                    value={variable.value}
                                    onChange={this.handleChange}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

}