import React, {Component} from "react"

class ARArrayElement extends Component {
  
    constructor(props){
        super(props)
        this.state = {
            name : " ",
            key: this.props.key
        }

        this.handleChange = this.handleChange.bind(this)
        
    }
    
    handleChange(event){
        let value = event.target.value
        this.setState({name: value})
    }
    
    render(){
       
        return (
            <div>
               <input type="text" value = {this.state.name} onChange={this.handleChange}/>
               <button onClick={()=>this.props.removeElement(this.props.key)}>-</button>

            </div>
        )
    }
}
export default ARArrayElement