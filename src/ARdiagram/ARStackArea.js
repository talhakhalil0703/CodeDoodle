import React from "react";

import './ARStackArea.css'
import StackFrame from './shapes/StackFrame'

export default class ARStackArea extends React.Component {
    state = {
        stackFrameList:[{name:"main"}]
    }

    LayoutStackFrames = () => {
        return(
            <React.Fragment>
                {this.state.stackFrameList.map(stackFrame =>
                        <div key={stackFrame.name} className="stackFrame">
                            <StackFrame name={stackFrame.name}/>
                        </div>
                )}
            </ React.Fragment>
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
                <div id="stackAreaTop">
                    <h1>Stack</h1>
                    <button id="stackAddButton" onClick={this.addStackFrame}>Add</button>
                </ div>

                <div id="allStackFrames">
                    <this.LayoutStackFrames />
                </div>
            </React.Fragment>
        );
    }
}