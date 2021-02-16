import { createSlice } from '@reduxjs/toolkit';

export const classesSlice = createSlice({
    name: 'classesSlice',
    initialState: {
        classList: [],
    },
    reducers: {
        addToList: state => {
            state.reRenderToggle = !state.reRenderToggle;
        }
    }
});

export const { addClass } = arrowSlice.actions;

export const selectReRenderToggle = state => state.arrow.reRenderToggle;

export default arrowSlice.reducer;