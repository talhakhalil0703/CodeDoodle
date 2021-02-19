import './ARArray.css'
import {useDispatch} from "react-redux"
import {changeArrayVariable} from "../components/codeDoodle/stackSlice"

const ARArrayElement = (props) => { // TODO Convert this to not use state
    const dispatch = useDispatch()
    
    const handleChange= (event) => {
        let value = event.target.value
        let arrayVariableID = props.arrayVariableID
        let variableID = props.id
        let removeElement = false
        dispatch(changeArrayVariable({value, arrayVariableID, variableID, removeElement}))
    }

    const removeElement= ()=>{
        console.log("Removing Element")
        let value = null
        let arrayVariableID = props.arrayVariableID
        let variableID = props.id
        let removeElement = true
        dispatch(changeArrayVariable({value, arrayVariableID, variableID, removeElement}))
    }

    return (
        <div className = "element">
            <input type="text" value={props.name} onChange={(event)=>handleChange(event)} />
            <button onClick={() => removeElement()}>-</button> {/*You need to use ()=>f() as then it won't get called in creation*/}
        </div>
    )
    
}
export default ARArrayElement