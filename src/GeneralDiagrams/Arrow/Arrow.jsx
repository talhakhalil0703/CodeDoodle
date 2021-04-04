import React, {useState, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom'
import Xarrow from "react-xarrows"
import { useSelector } from 'react-redux'
import {
    selectReRenderToggle,
} from './arrowSlice'

/*
// uses xArrow, but renders this element in another root div called arrow-root, this is in public/index.html after root
// uses portals to render it there, this was to make it not get overlapped by other elements (zIndex doesn't solve this easily with react)
// (inflexibility of library xArrow v1)

// also has event listener to change state of the arrow upon resizing of the window, this is simply to force the arrow to re-rener
// so it shows up in the proper place -> should move this to higher order now that we use redux

<Xarrow headSize={0} {...props}/>,el -> this is for arrow without arrow head (reference arrow tyep)
*/

const arrowRoot = document.getElementById('arrow-root')

const Arrow = (props) => { 
    const [resizing, setResizing] = React.useState(false) 
    const reRenderToggle = useSelector(selectReRenderToggle)
    const el = document.createElement('div')

    const handleResize = () => {
        setResizing(true)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        arrowRoot.appendChild(el)

        return function cleanup() {
            arrowRoot.removeChild(el)
            window.removeEventListener('resize', handleResize)
            setResizing(false)
        }
    })

    return ReactDOM.createPortal(
        <Xarrow color='black' {...props}/>,el
    )

}

export default Arrow