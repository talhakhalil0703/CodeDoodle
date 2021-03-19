import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable';
import { Paper, Typography } from '@material-ui/core'
import './Anchor.css'
import CloseIcon from '@material-ui/icons/Close';
import {
    reRender as reRenderArrows,
} from '../../GeneralDiagrams/Arrow/arrowSlice'
import {
    deleteAnchor as deleteAnchorFromList,
} from './anchorSlice'

/*
// uses xArrow, but renders this element in another root div called arrow-root, this is in public/index.html after root
// uses portals to render it there, this was to make it not get overlapped by other elements (zIndex doesn't solve this easily with react)
// (inflexibility of library xArrow v1)

// also has event listener to change state of the arrow upon resizing of the window, this is simply to force the arrow to re-rener
// so it shows up in the proper place 

// anchors are rendered by CodeDoodle.jsx 
*/
const arrowRoot = document.getElementById('arrow-root')

const Anchor = (props) => {
    const dispatch = useDispatch()
    const el = document.createElement('div')

    useEffect(() => {
        arrowRoot.appendChild(el)

        return function cleanup() {
            arrowRoot.removeChild(el)
        }
    })

    const handleDrag = () => {        
        dispatch(reRenderArrows())
    }

    const deleteAnchor = () => {
        // payload
        dispatch(deleteAnchorFromList({ID:props.ID}))
    }

    return ReactDOM.createPortal(
        <Draggable 
            {...props} 
            defaultPosition={{x: 700, y: -300}} 
            className="anchor"
            onStop={handleDrag} 
        >
            <Paper elevation={3} id={"anchor-" + props.ID} className="anchor">
                <Typography variant="h7">{"ID:" + props.ID}</Typography>
                <CloseIcon onClick={deleteAnchor}/>
            </Paper>
        </Draggable>,el
    )

}

export default Anchor