import React, { Component } from "react";
import './ARStackArea.css'
import StackFrame from './shapes/StackFrame'
import { useDispatch,  useSelector} from 'react-redux'
import {addStackFrame,addToSingleStack, selectStack} from "../components/codeDoodle/stackSlice"

/* 
    Component makes up the stack section of the application, displays and populates all stackframes
    Manages no state
    
    Receives props:
     - stack: all info in the stack section
     - onStackChange: access to ARDiagramDrawArea onStackChange function
*/
const ARStackArea = (props) => {

    const dispatch = useDispatch()

    /* handles drag and drop of stackframes onto stack area (not currently used) */
    const handleDrop = (text, value) => {

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
    const handleNameChange = (id, name) => {

        var frames = props.value;
        frames[id].name = name;

        props.handleChange(frames);
    }

    /* handles changing a local variable in a stackframe */
    const handleLocalChange = (text, local) => {
        console.log("ARStackArea Local")
        console.log(local)
        console.log(text)
        dispatch(addToSingleStack({local, text}))
        // var frames = props.value;
        // frames[id].local = loc;

        // props.handleChange(frames);
    }

    /* handles changing arguments of a stackframe */
    const handleArgsChange= (id, arg)=> {

        var frames = props.value;
        frames[id].args = arg;

        props.handleChange(frames);
    }

    /* creates a new stack frame */
    const incrementStack = () => {

        // var st = this.props.value;
        // var name = 'void untitled';

        // if (st.length === 0) {
        //     name = 'int main';
        // }

        // var new_frame = {
        //     name: name,
        //     local: [],
        //     args: []
        // };

        // st.push(new_frame);

        // this.props.handleChange(st);
        console.log("incremeting stack")
        dispatch(addStackFrame());
    }

   
    const {  classes, drawInfoOpen, arrowConnectionPointsOpen } = props;
    const value = useSelector(selectStack)
    return (
        <React.Fragment>
            {console.log("ARStackArea Render")}
            {console.log(value)}
            <h1>Stack</h1>
            <button onClick={()=>incrementStack()}>Add</button>
            <div id="allStackFrames">
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
                                        arrowConnectionPointsOpen={arrowConnectionPointsOpen}
                                        onNameChange={()=>handleNameChange()}
                                        onLocalChange={(id, loc)=>handleLocalChange(id, loc)}
                                        onArgsChange={()=>handleArgsChange()}
                                        toggleArrowConnectionPoints={props.toggleArrowConnectionPoints}
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

export default ARStackArea;