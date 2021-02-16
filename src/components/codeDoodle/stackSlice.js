import { createSlice } from '@reduxjs/toolkit';

export const stackSlice = createSlice({
    name: 'stack',
    initialState: {
        // when toggled, state changes for arrow, this causes a re-render
        // for now causes all arrows to re-render (easier) ????? how to make for each arrow
        stack: []
    },
    reducers: {
        updateStack: (state, action) => {
            state.stack = action.payload;
        },
        addStackFrame: (state, action) => {

            var st = state.stack;
            var name = 'void untitled';

            if (state.stack.length === 0) {
                name = 'int main';
            }

            var new_frame = {
                name: name,
                local: [],
                args: []
            };
            
            st.push(new_frame);
            state.stack = st;
        }
    }
});

// above is reducer functions, below is the actions. 
export const { updateStack, addStackFrame } = stackSlice.actions;

//Hand off the state here
export const selectStack = state => state.stack.stack;

// imported by the store
export default stackSlice.reducer;

