import React from 'react';
import Variable from './Variable';
import EditableText from '../GeneralDiagrams/EditableText';
import './Class.css';
import Droppable from './Droppable';

/* Can display nested classes, but cannot handle dropping of classes onto classes right now */

class Class extends React.Component {

    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleVarChange = this.handleVarChange.bind(this);
        this.handleNestedDrops = this.handleNestedDrops.bind(this);
    }

    getDefaultName(c, length) {
        return String.fromCharCode(c.charCodeAt(0) + length);
    }

    handleDrop(text, value, classes) {

        var val = value;

        var primitives = ['int', 'double', 'boolean', 'float', 'char'];
        var name = this.getDefaultName('a', val.length);

        console.log('in handle Class drop');

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
            };

            val.push(new_var);
        }
        return val;
    }

    /* handles changing the name of a variable */
    handleNameChange(new_name) {
        const { id, value, ret } = this.props;
        this.props.onChange(id, new_name, value, ret);
    }

    /* handles changing the value of a variable */
    handleVarChange(var_id, var_name, var_val, var_ret) {

        var { id, name, value, ret } = this.props;

        value[var_id].name = var_name;
        value[var_id].value = var_val;
        value[var_id].return = var_ret;

        this.props.onChange(id, name, value, ret);
    }

    handleNestedDrops(val, nest_id) {

        console.log('in handleNestedDrops...');

        var { id, value } = this.props;

        value[nest_id].value = val;

        this.props.handleChange(value, id);
    }

    render() {
        const { value, type, name, drawInfoOpen, classes } = this.props;
        const primitives = ['int', 'double', 'boolean', 'float', 'char'];

        const DroppableClass = Droppable(Class);

        return (
            <div className='class'>
                <div className='class-name'>
                    {`${type} `}
                    <EditableText onChange={this.handleNameChange} value={name} editClassName="stackframeName" />
                </div>

                <div className='variables'>
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
                                            handleDrop={this.handleNestedDrops}
                                            handleChange={this.handleNestedDrops}
                                        />
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Class;