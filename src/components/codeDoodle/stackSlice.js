import { createSlice } from '@reduxjs/toolkit';

export const stackSlice = createSlice({
    name: 'stack',
    initialState: {
        // when toggled, state changes for arrow, this causes a re-render
        // for now causes all arrows to re-render (easier) ????? how to make for each arrow
        stack: [],
        test: [],
        newID: 0
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
        addVarToHalfFrame: (state, action) =>{
            let text = action.payload.text
            let id = action.payload.halfFrame.id
            let varID = state.newID++
            let val  = action.payload.halfFrame.value;
            var classes = action.payload.halfFrame.classes;

            var primitives = ['int', 'double', 'boolean', 'float', 'char'];
            var name = String.fromCharCode('a'.charCodeAt(0) + val.length)
    
            if (text === 'stack') {
                alert('stack frames cant be dropped here...')
            } else if (text === "array") {
                var new_var = {
                    variableID: varID,
                    type: text,
                    name: name,
                    value: { array: [ [ {
                        elementID: state.newID++,
                        elementValue: " "
                    }] ]}
                };
    
               
            }else if (!primitives.includes(text)) {
    
                var the_class = classes.find(item => item.name === text);
    
                new_var = {
                    variableID: varID,
                    type: the_class.name,
                    name: name,
                    value: the_class.variables,
                    return: '',
                };
    
            } else {
    
                 new_var = {
                    variableID: varID,
                    type: text,
                    name: name,
                    value: '???',
                    return: ''
                };
            }

            if (action.payload.halfFrame.name === "Local"){
                state.stack[id].local.push(new_var);
            } else if(action.payload.halfFrame.name === "Arguments"){
                state.stack[id].args.push(new_var);
            }
        }, addVarToArray: (state, action) =>{
            let props = action.payload.props
            let variableID = action.payload.props.variableID
            let dropType = action.payload.text
            let index = action.payload.index
            var primitives = ['int', 'double', 'boolean', 'float', 'char'];

            if (primitives.includes(dropType)){
                state.stack.map((stackFrame)=>{
                    stackFrame.local.map((variable)=>{
                        if(variable.variableID === variableID){
                            
                            variable.value.array[index] = [...props.value.array[index], {elementID: state.newID++, elementValue: " " }]
                        }
                        return(variable)
                    })
                    stackFrame.args.map((variable)=>{
                        if(variable.variableID === variableID){
                            variable.value.array[index] = [...props.value.array[index], {elementID: state.newID++, elementValue: " " }]
                        }
                        return(variable)
                    })
                    return stackFrame
                })
            } else if(dropType === "array"){
                state.stack.map((stackFrame)=>{
                    stackFrame.local.map((variable)=>{
                        if(variable.variableID === variableID){
                            variable.value.array = [...props.value.array, [{elementID: state.newID++, elementValue: " " }]]
                        }
                        return(variable)
                    })
                    stackFrame.args.map((variable)=>{
                        if(variable.variableID === variableID){
                            variable.value.array = [...props.value.array, [{elementID: state.newID++, elementValue: " " }]]
                        }
                        return(variable)
                    })
                    return stackFrame
                })
            }
        }
    }
});

// above is reducer functions, below is the actions. 
export const { updateStack, addStackFrame, addVarToHalfFrame, addVarToArray } = stackSlice.actions;

//Hand off the state here
export const selectStack = state => state.stack.stack;

// imported by the store
export default stackSlice.reducer;

