import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import {
    updateStack
} from './stackSlice'

const ReduxCodeDoodle = (props) => {
    const dispatch = useDispatch()
    

    const handleStack = (frames) => {
        console.log('updating stack') 
        dispatch(updateStack(frames))
    }

}

export default ReduxCodeDoodle