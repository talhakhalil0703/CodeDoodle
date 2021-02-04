import React, { Component } from "react"
import ARArray from "./ARArray"
import Droppable from '../components/Droppable'


const DroppableArray = Droppable(ARArray)

class ARArrayDrop extends Component {

    constructor(props){
        super(props);
        this.handleDrop = this.handleDrop.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    handleDrop(text){ //In here we can handle what the drop type was and reject if it doesn't fit our data type
        console.log('ARArrayDrop handleDrop value:');
        console.log(this.props)

        console.log(text)
        const { id, name, value } = this.props;
        this.props.handleDrop(id, name, value)
    }

    onChange(value){
        const { id, name } = this.props;
        this.props.onChange(id, name, value)
        console.log('ARArrayDrop onChange value:');
        console.log(value.array)
    }

    render() {
        return (
            <div>
                <DroppableArray 
                value = {this.props.value}
                handleDrop={this.handleDrop}
                onChange = {this.onChange}
                />
            </div>
        )
    }
}

export default ARArrayDrop