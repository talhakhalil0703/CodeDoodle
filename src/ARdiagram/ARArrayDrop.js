import React, { Component } from "react"
import ARArray from "./ARArray"
import Droppable from '../components/Droppable'



const DroppableArray = Droppable(ARArray)

class ARArrayDrop extends Component {

    constructor(props){
        super(props);
        this.handleDrop = this.handleDrop.bind(this)
    }

    handleDrop(state){
        //console.log(state)
    }

    render() {
        return (
            <div>
                <DroppableArray 
                value = {this.props.value}
                handleDrop={this.handleDrop}
                />
            </div>
        )
    }
}

export default ARArrayDrop