import React, { Component } from 'react';
import './Variable.css';
import './PointerNEW.css'
import EditableText from '../GeneralDiagrams/EditableText';
import Toggalable from './Toggalable';
import Xarrow from 'react-xarrows';

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
        this.handleReturnChange = this.handleReturnChange.bind(this);
        // this.convertTo = this.convertTo.bind(this);

        this.arrowRef = React.createRef();
        this.handleDrop = this.handleDrop.bind(this);
    }

    componentDidMount() {
        const arrow = this.arrowRef.current;
        arrow.addEventListener('drop', this.handleDrop);
    }

    handleDrop(e) {
        var start_id = e.dataTransfer.getData('arrow');

        const {type, name, value, ret, variableID, arrows} = this.props;
        var arr = Array.from(arrows);

        var end_id = type + '-' + name + '-' + variableID;

        var arrow = {
            start: start_id,
            end: end_id,
            value: value
        }

        arr.push(arrow);

        if(this.props.onChange) {
            this.props.onChange(variableID, name, value, ret, arr);
        }
    }


    /* handles changing the name of a variable */
    handleNameChange(new_name) {
        const { variableID, value, ret, arrows} = this.props;
        this.props.onChange(variableID, new_name, value, ret, arrows);
    }

    /* handles changing the value of a variable */
    handleValueChange(e) {
        const { variableID, name, ret, arrows } = this.props;
        const val = e.target.value;
        this.props.onChange(variableID, name, val, ret, arrows);
    }

    handleReturnChange(e) {
        const { variableID, name, value, arrows } = this.props;
        const ret = e.target.value;
        this.props.onChange(variableID, name, value, ret, arrows);
    }

    render() {
        const { name, type, value, ret, drawInfoOpen, variableID, arrows } = this.props;

        console.log(arrows);

        return (
            // this id is used to connect it to other arrows
            <div draggable={false} className='variable'>

                <Toggalable toggle={drawInfoOpen} alt={null}>
                    <div className='return-container'>
                        <textarea className='var-return' value={ret} onChange={this.handleReturnChange} />
                    </div>
                </Toggalable>

                <div className='var-content'>
                    <div className='var-name'>
                        {`${type} `}
                        <EditableText onChange={this.handleNameChange} value={name} editClassName="stackframeName" />
                    </div>
                    <div ref={this.arrowRef}>
                        <textarea id={type + '-' + name + '-' + variableID} className='var-value' value={value} onChange={this.handleValueChange} />
                    </div> 
                </div>

                {arrows.map(arrow => (
                    <Xarrow 
                        color='black'
                        className='arrow'
                        start={arrow.start} 
                        end={arrow.end} 
                        key={arrow.start + '-' + arrow.end}
                        endAnchor={'auto'}
                        startAnchor={"auto"}
                        path={'straight'}
                    />
                ))}
            </div>
        );
    }
}

export default Variable;