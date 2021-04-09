import React, { Component } from "react";
import "./ARStackArea.css";
import StackFrame from "./shapes/StackFrame";
import { useDispatch, useSelector } from "react-redux";
import {
  addStackFrame,
  addVarToHalfFrame,
  selectStack,
} from "../components/codeDoodle/stackSlice";
import { selectClasses } from "../components/codeDoodle/classSlice";

/* 
    Component makes up the stack section of the application, displays and populates all stackframes
    Manages no state
    
    Receives props:
     - stack: all info in the stack section
     - onStackChange: access to ARDiagramDrawArea onStackChange function
*/
const ARStackArea = (props) => {
  const dispatch = useDispatch();
  const classes = useSelector(selectClasses);

  /* handles changing a stackframes name */
  const handleNameChange = (id, name) => {
    var frames = props.value;
    frames[id].name = name;

    props.handleChange(frames);
  };

  /* handles changing a local variable in a stackframe */
  const handleLocalChange = (text, halfFrame) => {
    dispatch(addVarToHalfFrame({ halfFrame, text }));
  };

  /* handles changing arguments of a stackframe */
  const handleArgsChange = (text, halfFrame) => {
    dispatch(addVarToHalfFrame({ halfFrame, text }));
  };

  const { drawInfoOpen } = props;
  const value = useSelector(selectStack);
  return (
    <React.Fragment>
      <h1>Stack</h1>
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
                    onNameChange={() => handleNameChange()}
                    onLocalChange={(text, local) => handleLocalChange(text, local)}
                    onArgsChange={(text, args) => handleArgsChange(text, args)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ARStackArea;
