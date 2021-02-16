import { createSlice } from '@reduxjs/toolkit';

export const stackSlice = createSlice({
    name: 'sliceName',
    initialState: {
        // all of the state thigns should be here,
        // even if uninitialzied
        thing: [],
    },
    reducers: {
        actionName: state => {
            state.thing = action.payload;
        }
    }
});

export const { actionName } = arrowSlice.actions;

export const thing = state => state.arrow.thing;

export default somethingSlice.reducer;