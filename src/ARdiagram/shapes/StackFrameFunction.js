import React, { Component } from 'react';
import './StackFrame.css'
import '../../GeneralDiagrams/HandDrawnBoxes.css'
import ARHalfFrame from './shapeComponents/ARHalfFrame'
import EditableText from '../../GeneralDiagrams/EditableText'
import Droppable from '../../components/DroppableFunction';
import { useDispatch,  useSelector} from 'react-redux'
import {addToSingleStack} from "../../components/codeDoodle/stackSlice"

/*  
  StackFrame component makes up a stackframe on the application, creates a local and argument half-frame
  Manages no state

  Receives props:
   - id: a unique identifier of this stackframe
   - name: the name of this stackframe
   - local: the local variables of this stackframe
   - args: the arguments of this stackframe
   - onNameChange: access to ARStackAreas onNameChange function
   - onLocalChange: access to ARStackAreas onLocalChange functionv
   - onArgsChange: access to ARStackAreas onArgsChange function
*/

const DroppableHalfFrame = Droppable(ARHalfFrame);

const StackFrame = (props) => {
  const dispatch = useDispatch();
  /* handles dropping a new variable into the local variable area */
  const handleLocal = (local)=> {
    console.log("StackFrame")
    console.log(local)
    const id = props.id;
    // dispatch(addToSingleStack(local))
    // this.props.onLocalChange(id, local);
  }

  /* handles dropping a new variable into the args variable area */
  const handleArgs = (args) => {
    const id = props.id;
    props.onArgsChange(id, args);
  }

  /* handles name change of a stackframe */
  const handleNameChange = (name) => {
    const id = props.id;
    props.onNameChange(id, name);
  }


  const { name, local, args, classes, drawInfoOpen, arrowConnectionPointsOpen } = props;
  return (
    <React.Fragment>
      <EditableText
        onChange={()=>handleNameChange()}
        value={name}
        editClassName="stackframeName"
      />

      <div className="handDrawnBox3">
        <div className="inner3">

          <div ref={local} className="frame local">
            <DroppableHalfFrame
              name="Local"
              id ={props.id}
              value={local}
              classes={classes}
              drawInfoOpen={drawInfoOpen}
              arrowConnectionPointsOpen={arrowConnectionPointsOpen}
              toggleArrowConnectionPoints={props.toggleArrowConnectionPoints}
              handleDrop={()=>handleLocal()}
              handleChange={()=>handleLocal()}
            />
          </div>

          <div ref={args} className="frame arguments">
            <DroppableHalfFrame
              name="Arguments"
              value={args}
              id ={props.id}
              classes={classes}
              drawInfoOpen={false}
              arrowConnectionPointsOpen={arrowConnectionPointsOpen}
              toggleArrowConnectionPoints={props.toggleArrowConnectionPoints}
              handleDrop={()=>handleArgs()}
              handleChange={()=>handleArgs()}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
  
}

export default StackFrame