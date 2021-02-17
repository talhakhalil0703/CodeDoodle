import { createSlice } from '@reduxjs/toolkit';

export const stackSlice = createSlice({
    name: 'stack',
    initialState: {
        // when toggled, state changes for arrow, this causes a re-render
        // for now causes all arrows to re-render (easier) ????? how to make for each arrow
        stack: [],
        test: []
    },
    reducers: {
        updateStack: (state, action) => {
            console.log(action.payload)
            state.stack = action.payload;
        },
        addStackFrame: (state) => {
            var name = 'void untitled';

            if (state.stack.length === 0) {
                name = 'int main';
            }

            var new_frame = {
                index: state.stack.length,
                name: name,
                local: [],
                args: []
            };
            
            state.stack.push(new_frame);
        },
        addToSingleStack: (state, action) =>{
            let text = action.payload.text
            let id = action.payload.local.id

            let val  = action.payload.local.value;
            var classes = action.payload.local.classes;

            var primitives = ['int', 'double', 'boolean', 'float', 'char'];
            var name = String.fromCharCode('a'.charCodeAt(0) + val.length)
    
            if (text === 'stack') {
                alert('stack frames cant be dropped here...')
            } else if (text === "array") {
                var new_var = {
                    type: text,
                    name: name,
                    value: { array: [ [ {
                        elementID: 1,
                        elementValue: " "
                    }] ]}
                };
    
               
            }else if (!primitives.includes(text)) {
    
                var the_class = classes.find(item => item.name === text);
    
                new_var = {
                    type: the_class.name,
                    name: name,
                    value: the_class.variables,
                    return: '',
                };
    
    
            } else {
    
                 new_var = {
                    type: text,
                    name: name,
                    value: '???',
                    return: ''
                };

            // val.push(new_var);
            }
        state.stack[id].local.push(new_var);
        state.test.push(action.payload)
        }
    }
});

// above is reducer functions, below is the actions. 
export const { updateStack, addStackFrame,addToSingleStack } = stackSlice.actions;

//Hand off the state here
export const selectStack = state => state.stack.stack;

// imported by the store
export default stackSlice.reducer;

