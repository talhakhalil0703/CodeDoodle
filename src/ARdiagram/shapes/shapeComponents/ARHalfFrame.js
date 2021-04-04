import React from "react";
import Variable from "../../../components/Variable";
import Class from "../../../components/Class";
import Droppable from "../../../components/DroppableFunction";
import ARArrayDrop from "../../ARArrayDrop";
import { useDispatch } from "react-redux";
import { changeVariable } from "../../../components/codeDoodle/stackSlice";
/* 
    Component that makes up half of a stackframe, displays and populates all variables
    Manages no state

    Receives props:
     - name: the name of the half frame (Local or Arguments)
     - value: the variables to be displayed
     - onChange: access to StackFrames onChange function (handles changing variables)
*/

const DroppableClass = Droppable(Class);

const ARHalfFrame = (props) => {
  const dispatch = useDispatch();

  const handleVarChange = (
    variableID,
    variableName,
    variableValue,
    variableReturn
  ) => {
    console.log("Handling Var Change");
    let halfFrameType = props.name;
    dispatch(
      changeVariable({
        variableID,
        variableName,
        variableValue,
        variableReturn,
        halfFrameType,
      })
    );
  };

  const handleClassDrops = (val, id) => {
    console.log("Classes Drop");
    console.log(val);
    console.log(id);
    var value = props.value;

    value[id].value = val;

    props.handleChange(value);
  };

  const { value, drawInfoOpen, arrowConnectionPointsOpen } = props;
  const primitives = ["int", "double", "boolean", "float", "char"];
  return (
    <div>
      <h3>{props.name}</h3>
      <ul className="local-variables">
        {console.log("ARHalfFrame Value")}
        {console.log(value)}
        {value.map((item, index) => {
          if (primitives.includes(item.type)) {
            return (
              <li key={index}>
                <Variable
                  id={index}
                  variableID={item.variableID}
                  type={item.type}
                  name={item.name}
                  value={item.value}
                  ret={item.return}
                  drawInfoOpen={drawInfoOpen}
                  onChange={(var_id, name, val, ret) =>
                    handleVarChange(var_id, name, val, ret)
                  }
                  arrowConnectionPointsOpen={arrowConnectionPointsOpen}
                  toggleArrowConnectionPoints={
                    props.toggleArrowConnectionPoints
                  }
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
                />
              </li>
            );
          } else {
            return (
              <li key={index}>
                <DroppableClass
                  id={index}
                  variableID={item.variableID}
                  type={item.type}
                  name={item.name}
                  value={item.value}
                  ret={item.return}
                  drawInfoOpen={drawInfoOpen}
                  onChange={(var_id, name, val, ret) =>
                    handleVarChange(var_id, name, val, ret)
                  }
                  handleDrop={(val, id) => handleClassDrops(val, id)}
                  handleChange={(val, id) => handleClassDrops(val, id)}
                  arrowConnectionPointsOpen={arrowConnectionPointsOpen}
                  toggleArrowConnectionPoints={
                    props.toggleArrowConnectionPoints
                  }
                />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default ARHalfFrame;
