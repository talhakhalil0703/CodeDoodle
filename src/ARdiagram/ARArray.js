import "./ARArray.css";
import ARArrayElement from "./ARArrayElement";

const ARArray = (props) => {
  return (
    <div className="array">
      {props.value.array.map((
        singleArray //Map only works with arrays, you can nest maps
      ) => (
        <div className="mainArray" key={Math.floor(Math.random() * 1000)}>
          {singleArray.map((element) => (
            <ARArrayElement
              key={element.elementID}
              id={element.elementID}
              name={element.elementValue}
              arrayVariableID={props.variableID}
              className="element"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ARArray;
