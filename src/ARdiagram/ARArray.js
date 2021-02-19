import './ARArray.css'
import ARArrayElement from "./ARArrayElement"

const ARArray = (props) => {

    const  removeElement =(id) => { // Need to do double array traversal... mighe be slow?
        let value = props.value
        value.array.forEach((singleArray, index, arrays) => {arrays[index] = arrays[index].filter(element => element.elementID !== id);})//foreach takes three arguments, the element, index, and the array itself
        console.log(value)
        props.onChange(value)
        value.array.forEach((singleArray, index, arrays) => {if(singleArray.length === 0){arrays = arrays.splice(index, 1);}})//If empty remove the array it self
        //TODO: Remove array if all elements are removed from it, need parent to do this
    }

    const changeElementValue = (id, elementValue) => { // Need to do double array traversal... might be slow? Not too many elements for it to be slow
        console.log("Array Element Change")
        console.log(id)
        console.log(props)
        // let value = props.value
        // value.array.forEach(array => {
        //     array.forEach(element =>{
        //         if (element.elementID === id) {
        //             element.elementValue = elementValue
        //         }
        //     })
        // })
        props.onChange(props)
    }

    return (
        <div className="array">
            {props.value.array.map((singleArray) => ( //Map only works with arrays, you can nest maps
                <div className="mainArray" key = {Math.floor(Math.random() * 1000)}>
                    {singleArray.map((element) => (<ARArrayElement key={element.elementID}
                                                        id = {element.elementID}
                                                        name = {element.elementValue}
                                                        arrayVariableID = {props.variableID}
                                                        removeElement = {removeElement}
                                                        changeElement={changeElementValue}
                                                        className="element"                
                    />))}
                </div>
            ))}
        </div>
    )
    

}



export default ARArray