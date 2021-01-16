import React, { Component } from "react"

class ARArrayElement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            id: this.props.id
        }

        this.handleChange = this.handleChange.bind(this)
        console.log("created " + this.props.id)

    }

    handleChange(event) {
        let value = event.target.value
        this.setState({ name: value })
        this.props.changeElement(this.state.id, this.state.name)
    }

    render() {

        return (
            <div>
                <input type="text" value={this.state.name} onChange={this.handleChange} />
                <button onClick={() => this.props.removeElement(this.state.id)}>-</button> {/*You need to use ()=>f() as then it won't get called in creation*/}

            </div>
        )
    }
}
export default ARArrayElement