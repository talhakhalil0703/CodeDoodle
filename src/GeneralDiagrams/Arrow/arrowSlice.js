// initial example of utilizing redux in a modularized, isolated way
// this slice belongs entirely to arrow, and store loads it as one of its reducers
// all of the selectors, actions, inital state, etc are defined here for anything that 
// has to do with arrow
// eg: anchors call reRender to re-render all arrows upon moving
import { createSlice } from '@reduxjs/toolkit';

export const arrowSlice = createSlice({
    name: 'arrow',
    initialState: {
        // when toggled, state changes for arrow, this causes a re-render
        // for now causes all arrows to re-render (easier) ????? how to make for each arrow
        reRenderToggle: true,
        color: 'black',
    },
    reducers: {
        reRender: state => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
            state.reRenderToggle = !state.reRenderToggle;
        },
    }
});

// above is reducer functions, below is the actions. 
export const { reRender } = arrowSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.arrow.reRenderToggle)`
// this is what you import if you're using this state in a component.
export const selectReRenderToggle = state => state.arrow.reRenderToggle;

// imported by the store
export default arrowSlice.reducer;

/* 
    The only other thing to worry about is dispatching actions (see anchor.js for how it dispatching an action
    There's only documentation for how to do this with a functional component using react hooks
*/