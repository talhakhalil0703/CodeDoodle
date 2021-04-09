import { createSlice } from "@reduxjs/toolkit";
import updateStaticFunction from "./StaticSlice/updateStaticFunction";
import addVarFunction from "./StaticSlice/addVarFunction";
import changeVariableFunction from "./StaticSlice/changeVariableFunction";
import addVarArrayFunction from './StaticSlice/addVarArrayFunction';

export const staticSlice = createSlice({
  name: "static",
  initialState: {
    stat: [],
  },
  reducers: {
    updateStatic: (state, action) => updateStaticFunction(state, action),
    changeVariable: (state, action) => changeVariableFunction(state, action),
    addVarStatic: (state, action) => addVarFunction(state, action),
    addVarArray: (state, action) => addVarArrayFunction(state, action)
  },
});

// above is reducer functions, below is the actions.
export const {
  updateStatic,
  changeVariable,
  addVarStatic,
  addVarArray
} = staticSlice.actions;

//Hand off the state here
export const selectStatic = (state) => state.stat.stat;

// imported by the store
export default staticSlice.reducer;
