import React from "react";

import './ARStackArea.css'
import StackFrame from './shapes/StackFrame'

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
        return (
            <React.Fragment>
                <h1>Stack</h1>
                <button onClick={this.addStackFrame}>Add</button>
                <div id="allStackFrames">
                    <this.LayoutStackFrames />
                </div>
            </React.Fragment>
        );
    }
}