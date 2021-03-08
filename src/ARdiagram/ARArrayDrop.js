import ARArray from "./ARArray";
import Droppable from "../components/DroppableFunction";
import { useDispatch } from "react-redux";
import { addVarToArray } from "../components/codeDoodle/stackSlice";

const DroppableArray = Droppable(ARArray);

const ARArrayDrop = (props) => {
  const dispatch = useDispatch();

  const handleDrop = (values, text) => {
    //In here we can handle what the drop type was and reject if it doesn't fit our data type
    console.log("Handling Drop in ARArrayDrop");
    console.log(text);
    console.log(values);
    let index = 0;
    if (values.value.array.length >= 2) {
      index = window.prompt("Which array would you like to enter the element?"); // TODO: Add error checking
    }

    dispatch(addVarToArray({ props, text, index }));
  };

  return (
    <div>
      <DroppableArray
        id={props.id}
        variableID={props.variableID}
        name={props.name}
        type={props.type}
        value={props.value}
        classId={props?.classId}
        handleDrop={(values, text) => handleDrop(values, text)}
      />
    </div>
  );
};

export default ARArrayDrop;
