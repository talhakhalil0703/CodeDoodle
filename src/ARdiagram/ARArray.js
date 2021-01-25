import React, { Component } from "react"

import ARArrayElement from "./ARArrayItem"

class ARArray extends Component {

    constructor(props) {
        super(props)

        this.state = {
            element: [{
                elementID: [1],
                elementValue: [" "]
            }]
        }
        this.addElement = this.addElement.bind(this)
        this.removeElement = this.removeElement.bind(this)
        this.changeElementValue = this.changeElementValue.bind(this)
        this.handleDrop = this.handleDrop.bind(this)
    }

    addElement() {
        console.log(this.props.value)
        this.props.value.element = [...this.props.value.element, {elementID: Math.floor(Math.random() * 1000), elementValue: " " }]
        this.setState({element: this.props.value.element})    
    }

    removeElement(id) {
        const newElement = this.state.element.filter(element => element.elementID !== id)
        console.log("new")
        console.log(newElement)
        this.props.value.element = newElement
        this.setState({element: newElement})
    }

    changeElementValue(id, value) {
        let newElement = this.state.element
        newElement.forEach(element => {
            if (element.elementID === id) {
                element.elementValue = value
            }
        })
        this.props.value.element = newElement
        this.setState(newElement)
        console.log(this.props.value)
    }

    handleDrop(text, value){
        if (text === "int"){
            console.log("Dropping int")
            this.addElement();
        } else if (text === 'double'){
            console.log("Dropping double")
        }

        //this.props.handleDrop(this.props.value)
    }

    render() {
        return (
            <div style = {{backgroundColor: "blue"}}>
                {console.log(this.state.element)}
                <div>
                    {this.state.element.map((item) => (<ARArrayElement key={item.elementID} id={item.elementID} name={item.elementValue} removeElement={this.removeElement} changeElement={this.changeElementValue} />))}
                </div>
                <button onClick={() => this.addElement()}>AddItem</button> {/*You need to use ()=>f() as then it won't get called in creation*/}
            </div>
        )
    }

}

export default ARArray