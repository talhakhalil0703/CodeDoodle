import React, { Component } from "react"
import './ARArray.css'


class ARArrayElement extends Component { // TODO Convert this to not use state

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.props.changeElement(this.props.id, event.target.value)
    }

    render() {

        return (
            <div className = "element">
                <input type="text" value={this.props.name} onChange={this.handleChange} />
                <button onClick={() => this.props.removeElement(this.props.id)}>-</button> {/*You need to use ()=>f() as then it won't get called in creation*/}

            </div>
        )
    }
}
export default ARArrayElement