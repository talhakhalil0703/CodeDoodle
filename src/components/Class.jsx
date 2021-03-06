import React, { useState } from "react";
import Variable from "./Variable";
import EditableText from "../GeneralDiagrams/EditableText";
import "./Class.css";
import Droppable from "./Droppable";
import Toggalable from "./Toggalable";
import Arrow from "../GeneralDiagrams/Arrow/Arrow";
import ClickMenu from "../GeneralDiagrams/SmallMenu";
import ARArrayDrop from "../ARdiagram/ARArrayDrop";
import { selectClasses } from "./codeDoodle/classSlice";
import { useSelector, useDispatch } from "react-redux";
import UniqueId from "./codeDoodle/UniqueId";
import { changeClassVariable } from "./codeDoodle/stackSlice";

/* Can display nested classes, but cannot handle dropping of classes onto classes right now */
const Class = (props) => {
  const classRef = React.createRef();
  const dispatch = useDispatch();
  const [hasArrow, setHasArrow] = useState(false);
  const [targetDiv, setTargetDiv] = useState("");
  const classes = useSelector(selectClasses);

  const getDefaultName = (c, length) => {
    return String.fromCharCode(c.charCodeAt(0) + length);
  };

  const handleDrop = (text, value, classes) => {
    console.log("Recieved a Class drop");
    var val = value;

    var primitives = ["int", "double", "boolean", "float", "char"];
    var name = this.getDefaultName("a", val.length);

    console.log("in handle Class drop");

    if (text === "stack") {
      alert("stack frames cant be dropped here...");
    } else if (text === "array") {
      var new_var = {
        type: text,
        variableID: UniqueId(),

        name: name,
        value: {
          array: [
            [
              {
                elementID: UniqueId(),
                elementValue: " ",
              },
            ],
          ],
        },
      };

      val.push(new_var);
    } else if (!primitives.includes(text)) {
      var the_class = classes.find((item) => item.name === text);

      var new_class = {
        variableID: UniqueId(),
        type: the_class.name,
        name: name,
        value: the_class.variables,
        return: "",
      };

      val.push(new_class);
    } else {
      var new_var = {
        variableID: UniqueId(),
        type: text,
        name: name,
        value: "fromClass",
        return: "",
      };

      val.push(new_var);
    }
    return val;
  };

  const convertTo = (newType, target) => {
    // ToDo: change the type
    setHasArrow(true);
    setTargetDiv(target);
  };

  /* handles changing the name of a variable */
  const handleNameChange = (new_name) => {
    const { id, value, ret } = props;
    props.onChange(id, new_name, value, ret);
  };

  /* handles changing the value of a variable */
  const handleVarChange = (var_id, var_name, var_val, var_ret) => {
    console.log("Attempting to change variable");
    console.log(var_id);
    console.log(var_name);
    console.log(var_val);
    console.log(var_ret);
    console.log(props);

    let v = { name: var_name, value: var_val, return: var_ret };
    //Cause a dispatch to stack asking it to chagne the props.variableID and in there find this and change it, call it handleClassVarChange

    dispatch(
      changeClassVariable({
        value: v,
        classVariableID: props.variableID,
        variableID: var_id,
      })
    );
    // props.onChange(id, name, value, ret);
  };

  const handleNestedDrops = (val, nest_id) => {
    console.log("in handleNestedDrops...");
    console.log(val);
    console.log(nest_id);
    var { id, value } = props;

    value[nest_id].value = val;

    props.handleChange(value, id);
  };

  const handleArrayDrop = (id, name, val) => {
    var value = props.value;
    value[id].name = name;
    value[id].value = val;

    props.handleChange(value, id);
  };

  const {
    value,
    type,
    name,
    drawInfoOpen,
    arrowConnectionPointsOpen,
    id,
  } = props;
  const primitives = ["int", "double", "boolean", "float", "char"];

  const DroppableClass = Droppable(Class);

  return (
    <div ref={classRef} className="class" id={"object-" + name + id}>
      <div className="class-name">
        <ClickMenu
          id={name + id}
          arrowConnectionPointsOpen={arrowConnectionPointsOpen}
          toggleArrowConnectionPoints={props.toggleArrowConnectionPoints}
          convertTo={() => convertTo()}
        />
        {`${type} `}
        &nbsp;
        <EditableText
          onChange={() => handleNameChange()}
          value={name}
          editClassName="stackframeName"
        />
        &nbsp;
        <Toggalable toggle={arrowConnectionPointsOpen} alt={null}>
          {"object-" + name + id}
        </Toggalable>
      </div>

      <div className="variables">
        <ul>
          {console.log("Class Value for mapping")}
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
                    onChange={(var_id, var_name, var_val, var_ret) =>
                      handleVarChange(var_id, var_name, var_val, var_ret)
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
                    classId={props.variableID}
                    onChange={(var_id, var_name, var_val, var_ret) =>
                      handleVarChange(var_id, var_name, var_val, var_ret)
                    }
                    handleDrop={() => handleArrayDrop()}
                    handleChange={() => handleArrayDrop()}
                  />
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <DroppableClass
                    id={index}
                    type={item.type}
                    variableID={item.variableID}
                    name={item.name}
                    value={item.value}
                    ret={item.return}
                    classes={classes}
                    drawInfoOpen={drawInfoOpen}
                    onChange={() => handleVarChange()}
                    handleDrop={() => handleNestedDrops()}
                    handleChange={() => handleNestedDrops()}
                  />
                </li>
              );
            }
          })}
        </ul>
      </div>
      {hasArrow ? (
        <Arrow start={classRef} end={targetDiv} path={"grid"} />
      ) : (
        <React.Fragment />
      )}
    </div>
  );
};

export default Class;
