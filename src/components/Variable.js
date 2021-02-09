import React, { Component } from 'react';
import './Variable.css';
import EditableText from '../GeneralDiagrams/EditableText';
import Toggalable from './Toggalable';
import ClickMenu from '../GeneralDiagrams/SmallMenu'
import Arrow from "../GeneralDiagrams/Arrow"

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
        this.convertTo = this.convertTo.bind(this);

        this.variableRef = React.createRef()

        this.state = {
            hasArrow:false, 
            targetDiv:''
        }
    }

    /* handles changing the name of a variable */
    handleNameChange(new_name) {
        const { id, value, ret } = this.props;
        this.props.onChange(id, new_name, value, ret);
    }

    /* handles changing the value of a variable */
    handleValueChange(e) {
        const { id, name, ret } = this.props;
        const val = e.target.value;
        this.props.onChange(id, name, val, ret);
    }

    handleReturnChange(e) {
        const { id, name, value } = this.props;
        const ret = e.target.value;
        this.props.onChange(id, name, value, ret);
    }

    // turns type to pointer/reference then changes type to current type + pointer/reference (doesn't do this yet)
    // and connects an pointer/reference arrow to the target
    convertTo(newType, target) {
        // ToDo: change the type

        this.setState(state => ({
            hasArrow: true,
            targetDiv: target,
        }));
    }

    render() {
        const { name, type, value, ret, drawInfoOpen, id, arrowConnectionPointsOpen } = this.props;
        const { hasArrow, targetDiv } = this.state

        return (
            // this id is used to connect it to other arrows
            <div ref={this.variableRef} id={ type + '-' + name + id } className='variable'>
                <ClickMenu 
                    id={name+id} 
                    arrowConnectionPointsOpen={arrowConnectionPointsOpen} 
                    toggleArrowConnectionPoints={this.props.toggleArrowConnectionPoints}
                    convertTo={this.convertTo}
                />

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
                    <textarea className='var-value' value={value} onChange={this.handleValueChange} />
                </div>

                <Toggalable toggle={arrowConnectionPointsOpen} alt={null}>
                    <p>{type + '-' + name + id}</p>
                </Toggalable>

                {hasArrow ?  <Arrow start={this.variableRef} end={targetDiv} path={"grid"} />:<React.Fragment/>}
            </div>
        );
    }
}

export default Variable;