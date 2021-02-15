import { configureStore } from '@reduxjs/toolkit'
import arrowReducer from './GeneralDiagrams/Arrow/arrowSlice'

export default configureStore({
    reducer: {
        arrow: arrowReducer,

    },
})