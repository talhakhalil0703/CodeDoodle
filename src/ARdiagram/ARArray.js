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

    removeElement(id) { // Need to do double array traversal... mighe be slow?
        let value = this.props.value
        value.array.forEach((singleArray, index, arrays) => {arrays[index] = arrays[index].filter(element => element.elementID !== id);})//foreach takes three arguments, the element, index, and the array itself
        console.log(value)
        this.props.onChange(value)
        value.array.forEach((singleArray, index, arrays) => {if(singleArray.length === 0){arrays = arrays.splice(index, 1);}})//If empty remove the array it self
        //TODO: Remove array if all elements are removed from it, need parent to do this
    }

    changeElementValue(id, elementValue) { // Need to do double array traversal... might be slow? Not too many elements for it to be slow
        let value = this.props.value
        value.array.forEach(array => {
            array.forEach(element =>{
                if (element.elementID === id) {
                    element.elementValue = elementValue
                }
            })
        })
        this.props.onChange(value)
        
    }

    handleDrop(text, value){ //Reminder child's handleDrop does not have access to the this pointer
        console.log('ARArray handleDrop props');
        console.log(value)
        

        if (text === 'array'){
            let newArray = [...value.array, [ {
                elementID: Math.floor(Math.random() * 1000),
                elementValue: " "
            }]]
            value.array = newArray
            return text // Return here as we don't need to send prompt for array index
        } 
        
        let index = 0
        if (value.array.length >= 2){
            index = window.prompt("Which array would you like to enter the element?") // TODO: Add error checking
        }
      
        if (text === "int"){ //TODO: instead check if text equals type we have, if so add, else don't add, add type checking into Element
            console.log("Dropping int")
            console.log(value.array[index])
            let newArray = [...value.array[index], {elementID: Math.floor(Math.random() * 1000), elementValue: " " }]
            value.array[index] = newArray;            
        } else if (text === 'double'){
            console.log("Dropping double")
        } 
        return text // Returns to parent of droppable
        
    }

    render() {
        console.log("Render props")
        console.log(this.props)

        return (
            <div className="array">
                {this.props.value.array.map((singleArray) => ( //Map only works with arrays, you can nest maps
                    <div className="mainArray">
                        {singleArray.map((element) => (<ARArrayElement key={element.elementID}
                                                            id = {element.elementID}
                                                            name = {element.elementValue}
                                                            removeElement = {this.removeElement}
                                                            changeElement={this.changeElementValue}
                                                            className="element"                
                        />))}
                    </div>
                ))}
            </div>
        )
    }

}



export default ARArray