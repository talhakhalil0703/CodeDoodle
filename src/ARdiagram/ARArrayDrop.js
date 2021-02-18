import ARArray from "./ARArray"
import Droppable from '../components/DroppableFunction'
import {useDispatch} from "react-redux"
import {addVarToArray} from "../components/codeDoodle/stackSlice"

const DroppableArray = Droppable(ARArray)

const ARArrayDrop = (props) => {
    const dispatch = useDispatch();

    const handleDrop = (values, text) => { //In here we can handle what the drop type was and reject if it doesn't fit our data type
        console.log('ARArrayDrop handleDrop value:');
        console.log(props)
        console.log(values);
        console.log(text);
        let index = 0
        if (values.value.array.length >= 2){
            index = window.prompt("Which array would you like to enter the element?") // TODO: Add error checking
        }

        dispatch(addVarToArray({props, text, index}))
    }

    const onChange = (value) =>{
        const { id, name } = this.props;
        this.props.onChange(id, name, value)
    }

    return (
        <div>
            <DroppableArray 
            id = {props.id}
            name = {props.name}
            type = {props.type}
            value = {props.value}
            handleDrop={(values, text) => handleDrop(values, text)}
            onChange = {(value) => onChange(value)}
            />
        </div>
    )
    
}

export default ARArrayDrop