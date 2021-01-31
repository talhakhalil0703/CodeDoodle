import React from 'react';
import Variable from '../../../components/Variable';
<<<<<<< HEAD
import Class from '../../../components/Class';
import Droppable from '../../../components/Droppable';
=======
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8

/* 
    Component that makes up half of a stackframe, displays and populates all variables
    Manages no state

    Receives props:
     - name: the name of the half frame (Local or Arguments)
     - value: the variables to be displayed
     - onChange: access to StackFrames onChange function (handles changing variables)
*/
<<<<<<< HEAD

const DroppableClass = Droppable(Class);

=======
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
export default class ARHalfFrame extends React.Component {

    constructor(props) {
        super(props);

        this.handleVarChange = this.handleVarChange.bind(this);
<<<<<<< HEAD
        this.handleClassDrops = this.handleClassDrops.bind(this);
=======
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
    }

    getDefaultName(c, length) {
        return String.fromCharCode(c.charCodeAt(0) + length);
    }

<<<<<<< HEAD
    handleDrop(text, value, classes) {

        var val = value;
        var primitives = ['int', 'double', 'boolean', 'float', 'char'];
        var name = this.getDefaultName('a', val.length);

        if (text === 'stack') {
            alert('stack frames cant be dropped here...')
        } else if (!primitives.includes(text)) {

            var the_class = classes.find(item => item.name === text);

            var new_class = {
                type: the_class.name,
                name: name,
                value: the_class.variables,
                return: '',
            };

            val.push(new_class);

        } else {

            var new_var = {
                type: text,
                name: name,
                value: '???',
                return: ''
=======
    handleDrop(text, value) {
        var val = value;

        if (text === 'stack') {
            alert('stack frames cant be dropped here...')
        } else {

            var name = this.getDefaultName('a', val.length);

            var new_var = {
                type: text,
                name: name,
                value: '???'
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
            };

            val.push(new_var);
        }
        return val;
    }

<<<<<<< HEAD
    handleVarChange(var_id, name, val, ret) {
=======
    handleVarChange(var_id, name, val) {
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
        var value = this.props.value;

        value[var_id].name = name;
        value[var_id].value = val;
<<<<<<< HEAD
        value[var_id].return = ret;

        this.props.handleChange(value);
    }

    handleClassDrops(val, id) {

        var value = this.props.value;

        value[id].value = val;
=======
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8

        this.props.handleChange(value);
    }

    render() {
<<<<<<< HEAD
        const { value, drawInfoOpen, classes } = this.props;
        const primitives = ['int', 'double', 'boolean', 'float', 'char'];
=======
        const { value } = this.props;
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
        return (
            <div>
                <h3>{this.props.name}</h3>

                <ul className='local-variables'>
<<<<<<< HEAD
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
                                        onChange={this.handleVarChange}
                                        handleDrop={this.handleClassDrops}
                                        handleChange={this.handleClassDrops}
                                    />
                                </li>
                            );
                        }
=======
                    {value.map((variable, index) => {
                        return (
                            <li key={index}>
                                <Variable
                                    id={index}
                                    type={variable.type}
                                    name={variable.name}
                                    value={variable.value}
                                    onChange={this.handleVarChange}
                                />
                            </li>
                        );
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
                    })}
                </ul>
            </div>
        );
    }

}