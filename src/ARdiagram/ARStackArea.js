<<<<<<< HEAD
import React, { Component } from "react";
=======
import React from "react";
>>>>>>> 3f7fd5cfee57ed86b4f531337f440f7de46cce10

import './ARStackArea.css'
import StackFrame from './shapes/StackFrame'

<<<<<<< HEAD
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
    }

    LayoutStackFrames = () => {
        return(
            <div className="stackFrameArea">
                {this.state.stackFrameList.map(stackFrame =>
                        <div key={stackFrame.name} className="stackFrame">
                            <StackFrame name={stackFrame.name}/>
                        </div>
                )}
            </ div>
        )
    };
    
    addStackFrame = () => {
        console.log("adding stack frame")
    
        this.setState(() => ({
            stackFrameList: this.state.stackFrameList.concat([{name:"unnamed"}])
        }));
    }

    render(){
>>>>>>> 3f7fd5cfee57ed86b4f531337f440f7de46cce10
        return (
            <React.Fragment>
                <h1>Stack</h1>
                <button onClick={this.addStackFrame}>Add</button>
                <div id="allStackFrames">
<<<<<<< HEAD
                    <div className="stackFrameArea">
                        <ul>
                            {value.map((stack, index) => {
                                return (
                                    <li key={index}>
                                        <StackFrame
                                            id={index}
                                            name={stack.name}
                                            local={stack.local}
                                            args={stack.args}
                                            classes={classes}
                                            drawInfoOpen={drawInfoOpen}
                                            onNameChange={this.handleNameChange}
                                            onLocalChange={this.handleLocalChange}
                                            onArgsChange={this.handleArgsChange}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </ div>
=======
                    <this.LayoutStackFrames />
>>>>>>> 3f7fd5cfee57ed86b4f531337f440f7de46cce10
                </div>
            </React.Fragment>
        );
    }
<<<<<<< HEAD
}

export default ARStackArea;
=======
}
>>>>>>> 3f7fd5cfee57ed86b4f531337f440f7de46cce10
