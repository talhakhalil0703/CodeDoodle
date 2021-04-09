import { createSlice } from "@reduxjs/toolkit";
import updateHeapFunction from "./HeapSlice/updateHeapFunction";
import addVarFunction from "./HeapSlice/addVarFunction";
import changeVariableFunction from "./HeapSlice/changeVariableFunction";
import addVarArrayFunction from "./HeapSlice/addVarArrayFunction";

export const heapSlice = createSlice({
  name: "heap",
  initialState: {
    heap: [],
  },
  reducers: {
    updateHeap: (state, action) => updateHeapFunction(state, action),
    changeVariable: (state, action) => changeVariableFunction(state, action),
    addVarHeap: (state, action) => addVarFunction(state, action),
    addVarArray: (state, action) => addVarArrayFunction(state, action)
  },
});

// above is reducer functions, below is the actions.
export const {
  updateHeap,
  changeVariable,
  addVarHeap,
  addVarArray
} = heapSlice.actions;

//Hand off the state here
export const selectHeap = (state) => state.heap.heap;

// imported by the store
export default heapSlice.reducer;
