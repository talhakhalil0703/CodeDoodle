import React from "react";
import Variable from "../../../components/Variable";
import Class from "../../../components/Class";
import Droppable from "../../../components/DroppableFunction";
import ARArrayDrop from "../../ARArrayDrop";
import { useDispatch } from "react-redux";
import { changeVariable, addVarArray } from "../../../components/codeDoodle/stackSlice";
import Pointer from '../../../components/PointerNEW';
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

  const handleVarChange = (var_id, name, val, ret, arrows) => {
    let half_frame = props.name;
    var id = props.id;
    console.log(props.value);
    dispatch(changeVariable({id, var_id, name, val, ret, half_frame, arrows}));
  };

  const addVarArrayStack = (text, values) => {
    const {name, id} = props;
    dispatch(addVarArray({text, values, id, name}))
  }

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
                onChange={(var_id, name, val, ret, arrows) =>
                  handleVarChange(var_id, name, val, ret, arrows)
                }
              />
            </li>
            );
          }

          else if (primitives.includes(item.type)) {
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
                  onChange={(var_id, name, val, ret, arrows) =>
                    handleVarChange(var_id, name, val, ret, arrows)
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
                  handleDrop={addVarArrayStack}
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
