import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable';

/*
// uses xArrow, but renders this element in another root div called arrow-root, this is in public/index.html after root
// uses portals to render it there, this was to make it not get overlapped by other elements (zIndex doesn't solve this easily with react)
// (inflexibility of library xArrow v1)

// also has event listener to change state of the arrow upon resizing of the window, this is simply to force the arrow to re-rener
// so it shows up in the proper place 
*/

const arrowRoot = document.getElementById('arrow-root')

const Anchor = (props) => {
    // const [resizing, setResizing] = React.useState(false)

    const el = document.createElement('div')

    useEffect(() => {
        console.log('in anchor id: ' + props.number)
        // const handleResize = () => {
        //     console.log('resized')
        //     setResizing(true)
        // }

        // window.addEventListener('resize', handleResize)

        arrowRoot.appendChild(el)

        return function cleanup() {
            arrowRoot.removeChild(el)
            // window.removeEventListener('resize', handleResize)
            // setResizing(false)
        }
    })

    return ReactDOM.createPortal(
        <Draggable {...props}>
            {props.children}
        </Draggable>,el
    )

}

export default Anchor