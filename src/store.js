import { configureStore } from "@reduxjs/toolkit";
import arrowReducer from "./GeneralDiagrams/Arrow/arrowSlice";
import stackReducer from "./components/codeDoodle/stackSlice";
import classesReducer from "./components/codeDoodle/classSlice";
import anchorReducer from "./components/anchor/anchorSlice";

export default configureStore({
  reducer: {
    arrow: arrowReducer,
    stack: stackReducer,
    classes: classesReducer,
    anchors: anchorReducer,
  },
});
