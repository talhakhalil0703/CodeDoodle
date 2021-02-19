import './ARArray.css'
import {useDispatch} from "react-redux"
import {changeArrayVariable} from "../components/codeDoodle/stackSlice"

const ARArrayElement = (props) => { // TODO Convert this to not use state
    const dispatch = useDispatch()
    const handleChange= (event) => {
        console.log("Array Element Change")
        let value = event.target.value
        let arrayVariableID = props.arrayVariableID
        let variableID = props.id
        dispatch(changeArrayVariable({value, arrayVariableID, variableID}))
    }

    return (
        <div className = "element">
            <input type="text" value={props.name} onChange={(event)=>handleChange(event)} />
            <button onClick={() => props.removeElement(props.id)}>-</button> {/*You need to use ()=>f() as then it won't get called in creation*/}

        </div>
    )
    
}
export default ARArrayElement