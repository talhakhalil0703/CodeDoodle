import React, { Component } from "react";

import './ARStackArea.css'
import StackFrame from './shapes/StackFrame'

/* 
    Component makes up the stack section of the application, displays and populates all stackframes
    Manages no state
    
    Receives props:
     - stack: all info in the stack section
     - onStackChange: access to ARDiagramDrawArea onStackChange function
*/
export default class ARStackArea extends Component {

    constructor(props) {
        super(props);

        this.dropRef = React.createRef();
        this.handleDrop = this.handleDrop.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLocalChange = this.handleLocalChange.bind(this);
        this.handleArgsChange = this.handleArgsChange.bind(this);
    }

    /* adds event listeners for dragover and drop on component mount */
    componentDidMount() {
        const drop = this.dropRef.current;
        drop.addEventListener('dragover', this.handleDragOver);
        drop.addEventListener('drop', this.handleDrop);
    }

    /* handles dragover */
    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    /* handles drag and drop of stackframes onto stack area (not currently used) */
    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();

        /* retrieves info about what is being dragged and dropped */
        var text = e.dataTransfer.getData('Text');

        /* checks if its a stackframe */
        if (text !== 'stack') {
            alert('only stack frames can be dropped here...')
        } else {

            var st = this.props.stack;
            var name = 'untitled';

            /* make the first stackframe main always */
            if (st.length === 0) {
                name = 'main';
            }

            var new_frame = {
                name: name,
                local: [],
                args: []
            };

            st.push(new_frame);

            this.props.onStackChange(st);
        }
    }

    /* handles changing a stackframes name */
    handleNameChange(id, name) {

        var frames = this.props.stack;
        frames[id].name = name;

        this.props.onStackChange(frames);
    }

    /* handles changing a local variable in a stackframe */
    handleLocalChange(id, loc) {

        var frames = this.props.stack;
        frames[id].local = loc;

        this.props.onStackChange(frames);
    }

    /* handles changing arguments of a stackframe */
    handleArgsChange(id, arg) {

        var frames = this.props.stack;
        frames[id].args = arg;

        this.props.onStackChange(frames);
    }

    /* creates a new stack frame */
    addStackFrame = () => {

        var st = this.props.stack;
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

        this.props.onStackChange(st);
    }

    render() {
        const { stack } = this.props;
        return (
            <React.Fragment>
                <h1>Stack</h1>
                <button onClick={this.addStackFrame}>Add</button>
                <div id="allStackFrames">
                    <div className="stackFrameArea" ref={this.dropRef}>
                        <ul>
                            {stack.map((stack, index) => {
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
                    </ div>
                </div>
            </React.Fragment>
        );
    }
}