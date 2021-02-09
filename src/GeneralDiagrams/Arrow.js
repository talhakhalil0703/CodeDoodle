import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Xarrow from "react-xarrows"

/*
// uses xArrow, but renders this element in another root div called arrow-root, this is in public/index.html after root
// uses portals to render it there, this was to make it not get overlapped by other elements (zIndex doesn't solve this easily with react)
// (inflexibility of library xArrow v1)

// also has event listener to change state of the arrow upon resizing of the window, this is simply to force the arrow to re-rener
// so it shows up in the proper place 

// need to make it listen for draggingAnchor event, to change state (which triggers re-render) to point to new anchor position
*/

const arrowRoot = document.getElementById('arrow-root')

const Arrow = (props) => {
    const [resizing, setResizing] = React.useState(false)

    const el = document.createElement('div')

    const handleResize = () => {
        setResizing(true)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        // window.addEventListener('anchorDragging', handleResize)

        arrowRoot.appendChild(el)

        return function cleanup() {
            arrowRoot.removeChild(el)
            window.removeEventListener('resize', handleResize)
            // window.removeEventListener('anchorDragging', handleResize)
            setResizing(false)
        }
    })

    return ReactDOM.createPortal(
        <Xarrow {...props}/>,el
    )

}

export default Arrow