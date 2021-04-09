import React, { Component } from 'react';
import './Variable.css';
import './PointerNEW.css';
import EditableText from '../GeneralDiagrams/EditableText';
import Toggalable from './Toggalable';
import Xarrow from 'react-xarrows';
import { changeVariable } from './codeDoodle/HeapSlice/changeVariableFunction'

class Pointer extends Component {

    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleReturnChange = this.handleReturnChange.bind(this);

        this.variableRef = React.createRef();

        this.arrowRef = React.createRef();
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    componentDidMount() {
        const arrow = this.arrowRef.current;
        arrow.addEventListener("dragstart", this.handleDrag);
        arrow.addEventListener('drop', this.handleDrop);
    }

    handleDrag(e) {
        e.dataTransfer.setData('arrow', e.target.id);
    }

    handleDrop(e) {
        var start_id = e.dataTransfer.getData('arrow');

        const {type, name, value, id, ret, arrows} = this.props;
        var arr = Array.from(arrows)

        var end_id = type + '-' + name + '-' + id;

        var arrow = {
            start: start_id,
            end: end_id,
            value: value
        }

        arr.push(arrow);

        this.props.onChange(id, name, value, ret, arr);
    }

    /* handles changing the name of a variable */
    handleNameChange(new_name) {
        const { variableID, value, ret, arrows } = this.props;
        this.props.onChange(variableID, new_name, value, ret, arrows);
    }

    handleReturnChange(e) {
        const { variableID, name, value, arrows } = this.props;
        const ret = e.target.value;
        this.props.onChange(variableID, name, value, ret, arrows);
    }

    render() {
        const { name, type, value, ret, drawInfoOpen, id, arrows } = this.props;

        return (
            // this id is used to connect it to other arrows
            <div ref={this.variableRef} className='variable'>

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
                    <div className='pointer'>
                        <div id={type + '-' + name + '-' + id} draggable={true} className='dot' ref={this.arrowRef} />
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

export default Pointer;