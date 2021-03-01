import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DrawingIcons.css";
import ClassPopupArea from "./ClassPopupArea";
import Pointer from "./Pointer";
import { selectClasses } from "../components/codeDoodle/classSlice";
/* 
    Component makes up the drawing tools part of the application
    To add more items to the panel add to <ul> in this format:
        
        <li id='your_icon_name' draggable={true} onDragStart={this.handleDrag}>your_icon_name</li>
    
    Manages no State, recieves prop showButton, showButton is for class creator popup, what should not 
    be shown when class creator renders this menu ('new class' button, anchor button, and stackframe)
*/
const DrawingIcons = (props) => {
  const anchors = useSelector((state) => state.anchors);
  const dispatch = useDispatch();
  const classes = useSelector(selectClasses);
  /* 
        sets 'Text' to be equal to the targets id (i.e. if int is dragged, int will be loaded into 'Text'), will be retrieved in StackFrame.js
    */
  const handleDrag = (e) => {
    e.dataTransfer.setData("Text", e.target.id);
  };

  const dispatchNewAnchor = () => {
    dispatch({
      type: "new_anchor",
      payload: { divID: "anchor-2", initialPosition: { x: 400, y: -300 } },
    });
  };

  return (
    <div className="drawing-icons">
      <ul>
        {props.showButton ? (
          <li id="stack" draggable={true} onDragStart={handleDrag}>
            Stack Frame
          </li>
        ) : (
          <React.Fragment />
        )}

        <li id="int" draggable={true} onDragStart={handleDrag}>
          Int
        </li>
        <li id="double" draggable={true} onDragStart={handleDrag}>
          Double
        </li>
        <li id="boolean" draggable={true} onDragStart={handleDrag}>
          Boolean
        </li>
        <li id="char" draggable={true} onDragStart={handleDrag}>
          Char
        </li>
        <li id="array" draggable={true} onDragStart={handleDrag}>
          Array
        </li>

        <li>
          <h4>Classes</h4>
        </li>
        {classes.map((item, index) => (
          <li
            key={index}
            id={item.name}
            draggable={true}
            onDragStart={handleDrag}
          >
            {item.name}
          </li>
        ))}

        {props.showButton ? (
          <React.Fragment>
            <ClassPopupArea
              classList={props.classList}
              onClassListChange={props.onClassListChange}
              showButton={props.showButton}
            />

            <li>
              <h4>General</h4>
            </li>
            <li id="anchor" onClick={dispatchNewAnchor}>
              <button>Anchor</button>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment />
        )}
      </ul>
    </div>
  );
};

export default DrawingIcons;
