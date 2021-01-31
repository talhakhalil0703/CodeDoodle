<<<<<<< HEAD
<<<<<<< HEAD
import React, { Component } from "react";
=======
import React from "react";
>>>>>>> 3f7fd5cfee57ed86b4f531337f440f7de46cce10
=======
import React, { Component } from "react";
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8

import './ARStackArea.css'
import StackFrame from './shapes/StackFrame'

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
/* 
    Component makes up the stack section of the application, displays and populates all stackframes
    Manages no state
    
    Receives props:
     - stack: all info in the stack section
     - onStackChange: access to ARDiagramDrawArea onStackChange function
*/
class ARStackArea extends Component {

    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLocalChange = this.handleLocalChange.bind(this);
        this.handleArgsChange = this.handleArgsChange.bind(this);
<<<<<<< HEAD
    }

    /* handles drag and drop of stackframes onto stack area (not currently used) */
    handleDrop(text, value) {

        var st = value;

        /* checks if its a stackframe */
        if (text !== 'stack') {
            alert('only stack frames can be dropped here...')
        } else {

            var name = 'void untitled';

            /* make the first stackframe main always */
            if (st.length === 0) {
                name = 'int main';
            }

            var new_frame = {
                name: name,
                local: [],
                args: []
            };

            st.push(new_frame);
        }
        return st;
    }

    /* handles changing a stackframes name */
    handleNameChange(id, name) {

        var frames = this.props.value;
        frames[id].name = name;

        this.props.handleChange(frames);
    }

    /* handles changing a local variable in a stackframe */
    handleLocalChange(id, loc) {

        var frames = this.props.value;
        frames[id].local = loc;

        this.props.handleChange(frames);
    }

    /* handles changing arguments of a stackframe */
    handleArgsChange(id, arg) {

        var frames = this.props.value;
        frames[id].args = arg;

        this.props.handleChange(frames);
    }

    /* creates a new stack frame */
    addStackFrame = () => {

        var st = this.props.value;
        var name = 'void untitled';

        if (st.length === 0) {
            name = 'int main';
        }

        var new_frame = {
            name: name,
            local: [],
            args: []
        };

        st.push(new_frame);

        this.props.handleChange(st);
    }

    render() {
        const { value, classes, drawInfoOpen } = this.props;
=======
export default class ARStackArea extends React.Component {
    state = {
        stackFrameList:[{name:"main"}]
=======
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
    }

    /* handles drag and drop of stackframes onto stack area (not currently used) */
    handleDrop(text, value) {

        var st = value;

        /* checks if its a stackframe */
        if (text !== 'stack') {
            alert('only stack frames can be dropped here...')
        } else {

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
        }
        return st;
    }

    /* handles changing a stackframes name */
    handleNameChange(id, name) {

        var frames = this.props.value;
        frames[id].name = name;

        this.props.handleChange(frames);
    }

    /* handles changing a local variable in a stackframe */
    handleLocalChange(id, loc) {

        var frames = this.props.value;
        frames[id].local = loc;

        this.props.handleChange(frames);
    }

    /* handles changing arguments of a stackframe */
    handleArgsChange(id, arg) {

        var frames = this.props.value;
        frames[id].args = arg;

        this.props.handleChange(frames);
    }

    /* creates a new stack frame */
    addStackFrame = () => {

        var st = this.props.value;
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

        this.props.handleChange(st);
    }

<<<<<<< HEAD
    render(){
>>>>>>> 3f7fd5cfee57ed86b4f531337f440f7de46cce10
=======
    render() {
        const stack = this.props.value;
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
        return (
            <React.Fragment>
                <h1>Stack</h1>
                <button onClick={this.addStackFrame}>Add</button>
                <div id="allStackFrames">
<<<<<<< HEAD
<<<<<<< HEAD
                    <div className="stackFrameArea">
                        <ul>
                            {value.map((stack, index) => {
=======
                    <div className="stackFrameArea">
                        <ul>
                            {stack.map((stack, index) => {
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
                                return (
                                    <li key={index}>
                                        <StackFrame
                                            id={index}
                                            name={stack.name}
                                            local={stack.local}
                                            args={stack.args}
<<<<<<< HEAD
                                            classes={classes}
                                            drawInfoOpen={drawInfoOpen}
=======
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
                                            onNameChange={this.handleNameChange}
                                            onLocalChange={this.handleLocalChange}
                                            onArgsChange={this.handleArgsChange}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </ div>
<<<<<<< HEAD
=======
                    <this.LayoutStackFrames />
>>>>>>> 3f7fd5cfee57ed86b4f531337f440f7de46cce10
=======
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
                </div>
            </React.Fragment>
        );
    }
<<<<<<< HEAD
<<<<<<< HEAD
}

export default ARStackArea;
=======
}
>>>>>>> 3f7fd5cfee57ed86b4f531337f440f7de46cce10
=======
}

export default ARStackArea;
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
