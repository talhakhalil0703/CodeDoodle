import ARArray from "./ARArray";
import Droppable from "../components/DroppableFunction";
import { useDispatch } from "react-redux";
import { addVarToArray } from "../components/codeDoodle/stackSlice";

const DroppableArray = Droppable(ARArray);

const ARArrayDrop = (props) => {
  const dispatch = useDispatch();

  const handleDrop = (values, text) => {
    props.handleDrop(text, values);
  };

  return (
    <div>
      {`${props.type} ${props.name}`}
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
