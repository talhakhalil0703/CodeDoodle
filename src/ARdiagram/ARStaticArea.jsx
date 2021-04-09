import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeVariable, selectStatic, addVarArray } from "../components/codeDoodle/staticSlice";
import ARArrayDrop from "./ARArrayDrop";
import Variable from "../components/Variable";
import Pointer from '../components/PointerNEW';

/* 
    Component makes up the stack section of the application, displays and populates all stackframes
    Manages no state
    
    Receives props:
     - stack: all info in the stack section
     - onStackChange: access to ARDiagramDrawArea onStackChange function
*/

const ARStaticArea = (props) => {

  const dispatch = useDispatch();
  const value = useSelector(selectStatic);

    /* handles changing the value of a variable */
  const handleVarChange = (var_id, name, val, ret, arrows) => {
    dispatch(changeVariable({ var_id, name, val, ret, arrows }))
  }

  const addVarArrayStatic = (text, values) => {
    dispatch(addVarArray({text, values}))
  }

  const { drawInfoOpen } = props;
  const primitives = ["int", "double", "boolean", "float", "char"];

  return (
    <React.Fragment>
      <h1>Static</h1>
      <div>
      <ul className="heap">
        {value.map((item, index) => {
          if(item.type === 'pointer') {
            return (
            <li key={index}>
            <Pointer
              id={index}
              variableID={item.variableID}
              type={item.type}
              name={item.name}
              value={item.value}
              ret={item.return}
              arrows={item.arrows}
              drawInfoOpen={drawInfoOpen}
              onChange={handleVarChange}
            />
          </li>
            );
          } else if (primitives.includes(item.type)) {
            return (
              <li key={index}>
                <Variable
                  id={index}
                  variableID={item.variableID}
                  type={item.type}
                  name={item.name}
                  value={item.value}
                  ret={item.return}
                  arrows={item.arrows}
                  drawInfoOpen={drawInfoOpen}
                  onChange={handleVarChange}
                />
              </li>
            );
          } else if (item.type === "array") {
            return (
              <li key={index}>
                <ARArrayDrop
                  id={index}
                  variableID={item.variableID}
                  type={item.type}
                  name={item.name}
                  value={item.value}
                  classId={item?.classId}
                  handleDrop={addVarArrayStatic}
                />
              </li>
            );
          } else {
            // return (
            //   <li key={index}>
            //     <DroppableClass
            //       id={index}
            //       variableID={item.variableID}
            //       type={item.type}
            //       name={item.name}
            //       value={item.value}
            //       ret={item.return}
            //       drawInfoOpen={drawInfoOpen}
            //       onChange={(var_id, name, val, ret) =>
            //         handleVarChange(var_id, name, val, ret)
            //       }
            //       handleDrop={(val, id) => handleClassDrops(val, id)}
            //       handleChange={(val, id) => handleClassDrops(val, id)}
            //       arrowConnectionPointsOpen={arrowConnectionPointsOpen}
            //       toggleArrowConnectionPoints={
            //         props.toggleArrowConnectionPoints
            //       }
            //     />
            //   </li>
            // );
          }
        })}
      </ul>
    </div>
    </React.Fragment>
  );
};

export default ARStaticArea;