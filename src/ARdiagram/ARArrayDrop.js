import React, { Component } from "react"
import ARArray from "./ARArray"
import Droppable from '../components/DroppableFunction'


const DroppableArray = Droppable(ARArray)

class ARArrayDrop extends Component {

    constructor(props){
        super(props);
        this.handleDrop = this.handleDrop.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    handleDrop(values, text){ //In here we can handle what the drop type was and reject if it doesn't fit our data type
        console.log('ARArrayDrop handleDrop value:');
        console.log(values);
        console.log(text);
        let index = 0
        if (values.value.array.length >= 2){
            index = window.prompt("Which array would you like to enter the element?") // TODO: Add error checking
        }

        if (text === "int"){ //TODO: instead check if text equals type we have, if so add, else don't add, add type checking into Element
            console.log("Dropping int")
            
            let newArray = [...values.value.array[index], {elementID: Math.floor(Math.random() * 1000), elementValue: " " }]
            values.value.array[index] = newArray;            
        }
        
        this.props.handleDrop(values.id, values.name, values.value)
    }

    onChange(value){
        const { id, name } = this.props;
        this.props.onChange(id, name, value)
    }

    render() {
        return (
            <div>
                <DroppableArray 
                id = {this.props.id}
                name = {this.props.name}
                type = {this.props.type}
                value = {this.props.value}
                handleDrop={this.handleDrop}
                onChange = {this.onChange}
                />
            </div>
        )
    }
}

export default ARArrayDrop