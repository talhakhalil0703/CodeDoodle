import React from 'react';
import Variable from '../../../components/Variable';
import Class from '../../../components/Class';
import Droppable from '../../../components/DroppableFunction';
import ARArrayDrop from "../../ARArrayDrop"

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

    const handleVarChange= (var_id, name, val, ret) => {
        console.log("Variable Change")
        console.log(props)
        console.log(var_id)
        console.log(name)
        console.log(val)
        console.log(ret)
        var value = props.value;

        value[var_id].name = name;
        value[var_id].value = val;
        value[var_id].return = ret;

        props.handleChange(value);
    }

    const handleClassDrops = (val, id) => {
        var value = props.value;

        value[id].value = val;

        props.handleChange(value);
    }
   
    const handleArrayDrop = (id, name, val) =>{
        var value = props.value;
        value[id].name = name;
        value[id].value = val;

        props.handleChange(value);
    }


    const { value, drawInfoOpen, classes, arrowConnectionPointsOpen } = props;
    const primitives = ['int', 'double', 'boolean', 'float', 'char'];
    return (
        
        <div>
            <h3>{props.name}</h3>
            <ul className='local-variables'>
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
                                    onChange={(var_id, name, val, ret) => handleVarChange(var_id, name, val, ret)}
                                    arrowConnectionPointsOpen={arrowConnectionPointsOpen}
                                    toggleArrowConnectionPoints={props.toggleArrowConnectionPoints}
                                />
                            </li>
                        );
                    }else if (item.type === 'array') {
                        return (
                            <li key={index}>
                                <ARArrayDrop 
                                id={index}
                                variableID={item.variableID}
                                type={item.type}
                                name={item.name}
                                value={item.value}
                                onChange={(var_id, name, val, ret) =>handleVarChange(var_id, name, val, ret)}
                                handleDrop={() =>handleArrayDrop()}
                                handleChange={() =>handleArrayDrop()}

                                />
                            </li>
                        );
                    }else {
                        return (
                            <li key={index}>
                                <DroppableClass
                                    id={index}
                                    variableID={item.variableID}
                                    type={item.type}
                                    name={item.name}
                                    value={item.value}
                                    ret={item.return}
                                    classes={classes}
                                    drawInfoOpen={drawInfoOpen}
                                    onChange={(var_id, name, val, ret) =>handleVarChange(var_id, name, val, ret)}
                                    handleDrop={() =>handleClassDrops()}
                                    handleChange={() =>handleClassDrops()}
                                    arrowConnectionPointsOpen={arrowConnectionPointsOpen}
                                    toggleArrowConnectionPoints={props.toggleArrowConnectionPoints}
                                />
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
    

}

export default ARHalfFrame