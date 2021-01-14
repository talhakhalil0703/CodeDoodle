import React, {Component} from "react"

import ARArrayElement from "./ARArrayItem"

class ARArray extends Component{
    
    constructor(props){
        super(props)

        this.state = {
            elements : []
        }
       this.addElement = this.addElement.bind(this)
       this.removeElement = this.removeElement.bind(this)
      
    }
    
    addElement(){
        this.setState( {elements : [...this.state.elements, Math.floor(Math.random()*1000)]})
        console.log(this.state.elements)
        console.log("Creating new item")
    }

    removeElement(id){
        let index = this.state.elements.indexOf(id)
        let newState= this.state.elements.splice(index, 1)


        this.setState( {newState})

        console.log("Remove element")
     
    }

    render(){
        return (
            <div>
                {this.state.elements.map((element) => (<ARArrayElement key={element} name={" "} removeElement={this.removeElement}/>))}
                <button onClick={()=>this.addElement()}>AddItem</button>
            </div>
        )
    }
   
}

export default ARArray