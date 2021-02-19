import React, { Component } from "react";
import './ARStackArea.css'
import StackFrame from './shapes/StackFrame'
import { useDispatch,  useSelector} from 'react-redux'
import {addStackFrame,addVarToHalfFrame, selectStack} from "../components/codeDoodle/stackSlice"

/* 
    Component makes up the stack section of the application, displays and populates all stackframes
    Manages no state
    
    Receives props:
     - stack: all info in the stack section
     - onStackChange: access to ARDiagramDrawArea onStackChange function
*/
const ARStackArea = (props) => {

    const dispatch = useDispatch()

    /* handles changing a stackframes name */
    const handleNameChange = (id, name) => {

        var frames = props.value;
        frames[id].name = name;

        props.handleChange(frames);
    }

    /* handles changing a local variable in a stackframe */
    const handleLocalChange = (text, halfFrame) => {
        console.log("ARStackArea Local")
        console.log(halfFrame)
        console.log(text)
        dispatch(addVarToHalfFrame({halfFrame, text}))
        // var frames = props.value;
        // frames[id].local = loc;

        // props.handleChange(frames);
    }

    /* handles changing arguments of a stackframe */
    const handleArgsChange= (text, arg)=> {
        console.log("ARStackArea ARGS")
        console.log(arg)
        console.log(text)
        dispatch(addVarToHalfFrame({arg, text}))
    }

    /* creates a new stack frame */
    const incrementStack = () => {
        console.log("incremeting stack")
        dispatch(addStackFrame());
    }

    const {  classes, drawInfoOpen, arrowConnectionPointsOpen } = props;
    const value = useSelector(selectStack)
    return (
        <React.Fragment>
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
                                        onLocalChange={(text, local)=>handleLocalChange(text, local) 
                                        //Doing this allows for this to take in arguments REALLY USEFUL no idea how it works, without the arguments are not passed as it is functional
                                    }
                                        onArgsChange={(text, args)=>handleArgsChange(text, args)}
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