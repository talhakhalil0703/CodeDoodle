import React, { Component } from 'react';
import './StackFrame.css';
import Droppable from '../components/Droppable';
import StackFrameSection from './StackFrameSection';

const DroppableStackFrameSection = Droppable(StackFrameSection);

class StackFrame extends Component {

    constructor(props) {
        super(props);

        this.handleLocal = this.handleLocal.bind(this);
        this.handleArgs = this.handleArgs.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleLocal(local) {
        const id = this.props.id;
        this.props.onLocalChange(id, local);
    }

    handleArgs(args) {
        const id = this.props.id;
        this.props.onArgsChange(id, args);
    }

    handleNameChange(e) {
        const id = this.props.id;
        const val = e.target.value;
        this.props.onNameChange(id, val);
    }

    render() {
        const { name, local, args } = this.props;
        return (
            <div className='stack-frame'>

                <textarea className='stack-name' value={name} onChange={this.handleNameChange} />

                <div className='local-variables'>
                    <h5>Local</h5>
                    <DroppableStackFrameSection
                        value={local}
                        handleDrop={this.handleLocal}
                        handleChange={this.handleLocal}
                    />
                </div>

                <div className='args-variables'>
                    <h5>Args</h5>
                    <DroppableStackFrameSection
                        value={args}
                        handleDrop={this.handleArgs}
                        handleChange={this.handleArgs}
                    />
                </div>
            </div >
        );
    }
}

export default StackFrame;