import React from 'react';
import Variable from '../../../components/Variable';
import Class from '../../../components/Class';
import Droppable from '../../../components/Droppable';
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

export default class ARHalfFrame extends React.Component {

    constructor(props) {
        super(props);

        this.handleVarChange = this.handleVarChange.bind(this);
        this.handleClassDrops = this.handleClassDrops.bind(this);
        this.handleArrayDrop = this.handleArrayDrop.bind(this);
    }

    getDefaultName(c, length) {
        return String.fromCharCode(c.charCodeAt(0) + length);
    }

    handleDrop(text, value, classes) {

        var val = value;
        var primitives = ['int', 'double', 'boolean', 'float', 'char'];
        var name = this.getDefaultName('a', val.length);

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

            val.push(new_var);
        }
        return val;
    }

    handleVarChange(var_id, name, val, ret) {
        var value = this.props.value;

        value[var_id].name = name;
        value[var_id].value = val;
        value[var_id].return = ret;

        this.props.handleChange(value);
    }

    handleClassDrops(val, id) {
        console.log("in halfframe class drop")
        console.log(val)
        console.log(id)
        var value = this.props.value;

        value[id].value = val;

        this.props.handleChange(value);
    }
   
    handleArrayDrop(id, name, val){
        var value = this.props.value;
        value[id].name = name;
        value[id].value = val;

        this.props.handleChange(value);
    }

    render() {
        const { value, drawInfoOpen, classes, arrowConnectionPointsOpen } = this.props;
        const primitives = ['int', 'double', 'boolean', 'float', 'char'];
        return (
            <div>
                <h3>{this.props.name}</h3>

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
                                        onChange={this.handleVarChange}
                                        arrowConnectionPointsOpen={arrowConnectionPointsOpen}
                                        toggleArrowConnectionPoints={this.props.toggleArrowConnectionPoints}
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
                                    onChange={this.handleVarChange}
                                    handleDrop={this.handleArrayDrop}
                                    handleChange={this.handleArrayDrop}

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
                                        onChange={this.handleVarChange}
                                        handleDrop={this.handleClassDrops}
                                        handleChange={this.handleClassDrops}
                                        arrowConnectionPointsOpen={arrowConnectionPointsOpen}
                                        toggleArrowConnectionPoints={this.props.toggleArrowConnectionPoints}
                                    />
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        );
    }

}