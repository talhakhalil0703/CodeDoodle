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
import { useSelector } from "react-redux";

/* Can display nested classes, but cannot handle dropping of classes onto classes right now */
const Class = (props) => {
  const classRef = React.createRef();

  const [hasArrow, setHasArrow] = useState(false);
  const [targetDiv, setTargetDiv] = useState("");
  const classes = useSelector(selectClasses);

  const getDefaultName = (c, length) => {
    return String.fromCharCode(c.charCodeAt(0) + length);
  };

  const handleDrop = (text, value, classes) => {
    var val = value;

    var primitives = ["int", "double", "boolean", "float", "char"];
    var name = this.getDefaultName("a", val.length);

    console.log("in handle Class drop");

    if (text === "stack") {
      alert("stack frames cant be dropped here...");
    } else if (text === "array") {
      var new_var = {
        type: text,
        name: name,
        value: {
          array: [
            [
              {
                elementID: 1,
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
        type: the_class.name,
        name: name,
        value: the_class.variables,
        return: "",
      };

      val.push(new_class);
    } else {
      var new_var = {
        type: text,
        name: name,
        value: "???",
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
    var { id, name, value, ret } = props;
    console.log("Attempting to change variable");
    value[var_id].name = var_name;
    value[var_id].value = var_val;
    value[var_id].return = var_ret;

    props.onChange(id, name, value, ret);
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
          {value.map((item, index) => {
            if (primitives.includes(item.type)) {
              return (
                <li key={index}>
                  <Variable
                    id={index}
                    type={item.type}
                    name={item.name}
                    value={item.value}
                    ret={item.return}
                    drawInfoOpen={drawInfoOpen}
                    onChange={() => handleVarChange()}
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
                    type={item.type}
                    name={item.name}
                    value={item.value}
                    onChange={() => handleVarChange()}
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
