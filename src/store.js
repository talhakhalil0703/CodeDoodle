import { configureStore } from '@reduxjs/toolkit'
import arrowReducer from './GeneralDiagrams/Arrow/arrowSlice'
import stackReducer from './components/codeDoodle/stackSlice'

export default configureStore({
    reducer: {
        arrow: arrowReducer,
        stack: stackReducer
    },
  
})