import { createSlice } from "@reduxjs/toolkit";
import updateClassesFunction from "./ClassSlice/updateClassesFunction";

export const classesSlice = createSlice({
  name: "classes",
  initialState: {
    value: [],
  },
  reducers: {
    updateClasses: (state, action) => updateClassesFunction(state, action),
  },
});

// above is reducer functions, below is the actions.
export const { updateClasses } = classesSlice.actions;

export const selectClasses = (state) => state.classes.value;

// imported by the store
export default classesSlice.reducer;
