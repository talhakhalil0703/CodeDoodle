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

    const getDefaultName = (c, length) => {
        return String.fromCharCode(c.charCodeAt(0) + length);
    }

    const handleDrop= (text, value, classes) => {
        console.log("ARHalfFrame")
        console.log(text)
        console.log(value)
        console.log(classes)

        var val = value;
        var primitives = ['int', 'double', 'boolean', 'float', 'char'];
        var name = getDefaultName('a', val.length);

        if (text === 'stack') {
            alert('stack frames cant be dropped here...')
        } else if (text === "array") {
            var new_var = {
                type: text,
                name: name,
                value: { array: [ [ {
                    elementID: 1,
                    elementValue: " "
                }] ]}
            };

            val.push(new_var);
        }else if (!primitives.includes(text)) {

            var the_class = classes.find(item => item.name === text);

            var new_class = {
                type: the_class.name,
                name: name,
                value: the_class.variables,
                return: '',
            };

            val.push(new_class);

        } else {

             new_var = {
                type: text,
                name: name,
                value: '???',
                return: ''
            };

            console.log(val);
            console.log(new_var);

            val.push(new_var);
            console.log(val);
        }
        return val;
    }

    const handleVarChange= (var_id, name, val, ret) => {
        var value = props.value;

        value[var_id].name = name;
        value[var_id].value = val;
        value[var_id].return = ret;

        props.handleChange(value);
    }

    const handleClassDrops = (val, id) => {
        console.log("in halfframe class drop")
        console.log(val)
        console.log(id)
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
            {console.log("ARHalfFrame render")}
            {console.log(props)}
            <h3>{props.name}</h3>
            <ul className='local-variables'>
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
                                    toggleArrowConnectionPoints={props.toggleArrowConnectionPoints}
                                />
                            </li>
                        );
                    }else if (item.type === 'array') {
                        return (
                            <li key={index}>
                                <ARArrayDrop 
                                id={index}
                                type={item.type}
                                name={item.name}
                                value={item.value}
                                onChange={() =>handleVarChange()}
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
                                    type={item.type}
                                    name={item.name}
                                    value={item.value}
                                    ret={item.return}
                                    classes={classes}
                                    drawInfoOpen={drawInfoOpen}
                                    onChange={() =>handleVarChange()}
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