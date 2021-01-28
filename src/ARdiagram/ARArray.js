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
        
        if (text === "int"){
            console.log("Dropping int")
            let newElement = [...value.element, {elementID: Math.floor(Math.random() * 1000), elementValue: " " }]
            value.element = newElement;            
        } else if (text === 'double'){
            console.log("Dropping double")
        }
        return text // Returns to parent of droppable
        
    }

    render() {
        return (
            <div className="array">
                {this.props.value.element.map((item) => (<ARArrayElement key={item.elementID}
                                                                            id={item.elementID} 
                                                                            name={item.elementValue} 
                                                                            removeElement={this.removeElement} 
                                                                            changeElement={this.changeElementValue} 
                                                                            />))}
            </div>
        )
    }

}

export default ARArray