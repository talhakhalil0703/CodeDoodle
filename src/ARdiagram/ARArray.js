import React, { Component } from "react"
import './ARArray.css'
import ARArrayElement from "./ARArrayElement"

class ARArray extends Component {

    constructor(props) {
        super(props)

        this.addElement = this.addElement.bind(this)
        this.removeElement = this.removeElement.bind(this)
        this.changeElementValue = this.changeElementValue.bind(this)
        this.handleDrop = this.handleDrop.bind(this)
    }

    addElement() {
        let value = this.props.value
        let newElement = [...value.element, {elementID: Math.floor(Math.random() * 1000), elementValue: " " }]
        value.element = newElement;  
        this.props.onChange(value)
    }

    removeElement(id) {
        let value = this.props.value
        const newElement = value.element.filter(element => element.elementID !== id)
        this.props.value.element = newElement
        this.props.onChange(value)
    }

    changeElementValue(id, elementValue) {
        let value = this.props.value
        value.element.forEach(element => {
            if (element.elementID === id) {
                element.elementValue = elementValue
            }
        })
        this.props.onChange(value)
        
    }

    handleDrop(text, value){ //Reminder child's handleDrop does not have access to the this pointer
        console.log('ARArray handleDrop props');
        console.log(value)
        if (text === "int"){
            console.log("Dropping int")
            console.log(value.array[0])
            let newArray = [...value.array[0], {elementID: Math.floor(Math.random() * 1000), elementValue: " " }]
            value.array[0] = newArray;            
        } else if (text === 'array'){
            console.log("Dropping int")
            let newArray = [...value.array, [ {
                elementID: 1,
                elementValue: " "
            }] ]
            value.array = newArray
        }
        else if (text === 'double'){
            console.log("Dropping double")
        } 
        return text // Returns to parent of droppable
        
    }

    render() {
        return (
            <div className="array">
                {this.props.value.array.map((item) => (
                    <div className="mainArray">
                    {item.map((ele) => (<ARArrayElement key={ele.elementID}/>))}
                    </div>
                                                                            ))}
            </div>
        )
    }

}

export default ARArray