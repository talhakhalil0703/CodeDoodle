import React from 'react';
import Variable from './Variable';
import EditableText from '../GeneralDiagrams/EditableText';
import './Class.css';
import Droppable from './Droppable';
import Toggalable from  './Toggalable'
import Arrow from "../GeneralDiagrams/Arrow"
import Xarrow from 'react-xarrows'
import ClickMenu from '../GeneralDiagrams/SmallMenu'
import ARArrayDrop from "../ARdiagram/ARArrayDrop"

/* Can display nested classes, but cannot handle dropping of classes onto classes right now */
class Class extends React.Component {

    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleVarChange = this.handleVarChange.bind(this);
        this.handleNestedDrops = this.handleNestedDrops.bind(this);
        this.handleArrayDrop = this.handleArrayDrop.bind(this);
        this.convertTo = this.convertTo.bind(this);

        this.classRef = React.createRef()

        this.state = {
            hasArrow:false, 
            targetDiv:''
        }
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
        }  else if (text === "array") {
            var new_var = {
                type: text,
                name: name,
                value: { array: [ [ {
                    elementID: 1,
                    elementValue: " "
                }] ]}
            };

            val.push(new_var);
        }
        else if (!primitives.includes(text)) {

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

    convertTo(newType, target) {
        // ToDo: change the type
        this.setState(state => ({
            hasArrow: true,
            targetDiv: target,
        }));
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
        console.log(val)
        console.log(nest_id)
        var { id, value } = this.props;

        value[nest_id].value = val;

        this.props.handleChange(value, id);
    }


    handleArrayDrop(id, name, val){
        var value = this.props.value;
        value[id].name = name;
        value[id].value = val;

        this.props.handleChange(value, id);
    }

    render() {
        const { value, type, name, drawInfoOpen, classes, arrowConnectionPointsOpen,id } = this.props;
        const primitives = ['int', 'double', 'boolean', 'float', 'char'];
        const { hasArrow, targetDiv } = this.state
        const DroppableClass = Droppable(Class);
              

        return (
            <div ref={this.classRef} className='class' id={'object-' + name + id}>
                <div className='class-name'>
                    <ClickMenu 
                        id={name+id} 
                        arrowConnectionPointsOpen={arrowConnectionPointsOpen} 
                        toggleArrowConnectionPoints={this.props.toggleArrowConnectionPoints}
                        convertTo={this.convertTo}
                    />

                    {`${type} `}
                    &nbsp;
                    <EditableText onChange={this.handleNameChange} value={name} editClassName="stackframeName" />
                    &nbsp;
                    <Toggalable toggle={arrowConnectionPointsOpen} alt={null}>
                        {'object-' + name + id}
                    </Toggalable>        
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
                                            arrowConnectionPointsOpen={arrowConnectionPointsOpen}
                                            toggleArrowConnectionPoints={this.props.toggleArrowConnectionPoints}
                                        />
                                    </li>
                                );
                            } else if (item.type === 'array') {
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
                                            handleDrop={this.handleNestedDrops}
                                            handleChange={this.handleNestedDrops}
                                        />
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
                {hasArrow ?  <Arrow start={this.classRef} end={targetDiv} path={"grid"}/>:<React.Fragment/>}    
            </div>
        );
    }
}

export default Class;