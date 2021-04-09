import "./ARArray.css";
import Pointer from '../components/PointerNEW'
import Variable from '../components/Variable'

const ARArray = (props) => {

  const { drawInfoOpen, value } = props;
  const primitives = ["int", "double", "boolean", "float", "char"];

  console.log(value);

  return (

    <ul className="array">
      {value.map((item, index) => {
        if(item.rend === 'pointer') {
          return (
          <li className='array-elem' key={index}>
            <Pointer
              id={index}
              variableID={item.variableID}
              type={item.type}
              name={item.name}
              value={item.value}
              ret={item.return}
              arrows={item.arrows}
              drawInfoOpen={drawInfoOpen}
              // onChange={(var_id, name, val, ret, arrows) =>
              //   handleVarChange(var_id, name, val, ret, arrows)
              // }
            />
          </li>
          );
        }

else if (primitives.includes(item.rend)) {
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
      // onChange={(var_id, name, val, ret, arrows) =>
      //   handleVarChange(var_id, name, val, ret, arrows)
      // }
    />
  </li>
);
// } else if (item.type === "array") {
// return (
//   <li key={index}>
//     <ARArrayDrop
//       id={index}
//       variableID={item.variableID}
//       type={item.type}
//       name={item.name}
//       value={item.value}
//       classId={item?.classId}
//     />
//   </li>
// );
// } 
//     } else {
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
  );
};

export default ARArray;
