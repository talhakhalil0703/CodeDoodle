// see arrows for explaination of slices
import { createSlice } from '@reduxjs/toolkit';

export const codeDoodleSlice = createSlice({
    name: 'codeDoodle',
    initialState: {
        classes: [],
    },
    reducers: {
        addClass: state => {
            state.reRenderToggle = !state.reRenderToggle;
        }
    }
});

export const { addClass } = arrowSlice.actions;

export const selectReRenderToggle = state => state.arrow.reRenderToggle;

export default arrowSlice.reducer;
