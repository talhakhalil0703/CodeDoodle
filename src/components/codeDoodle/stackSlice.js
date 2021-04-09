import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import updateStackFunction from "./StackSlice/updateStackFunction";
import addStackFrameFunction from "./StackSlice/addStackFrameFunction";
import addVarToHalfFrameFunction from "./StackSlice/addVarToHalfFrameFunction";
import addVarArrayFunction from "./StackSlice/addVarToArrayFunction";
import changeVariableFunction from "./StackSlice/changeVariableFunction";
import changeArrayVariableFunction from "./StackSlice/changeArrayVariableFunction";
import changeClassVariableFunction from "./StackSlice/changeClassVariableFunction";

export const stackSlice = createSlice({
  name: "stack",
  initialState: {
    stack: [{
        index: 0,
        name: 'int main',
        local: [],
        args: [],
    }]
  },
  reducers: {
    updateStack: (state, action) => updateStackFunction(state, action),
    addStackFrame: (state) => addStackFrameFunction(state),
    addVarToHalfFrame: (state, action) =>
      addVarToHalfFrameFunction(state, action),
    addVarArray: (state, action) => addVarArrayFunction(state, action),
    changeVariable: (state, action) => changeVariableFunction(state, action),
    changeArrayVariable: (state, action) =>
      changeArrayVariableFunction(state, action),
    changeClassVariable: (state, action) =>
      changeClassVariableFunction(state, action),
  },
});

// above is reducer functions, below is the actions.
export const {
  updateStack,
  addStackFrame,
  addVarToHalfFrame,
  addVarArray,
  changeVariable,
  changeArrayVariable,
  changeClassVariable,
} = stackSlice.actions;

//Hand off the state here
export const selectStack = (state) => state.stack.stack;

// imported by the store
export default stackSlice.reducer;
