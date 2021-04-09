import { configureStore } from "@reduxjs/toolkit";
import arrowReducer from "./GeneralDiagrams/Arrow/arrowSlice";
import stackReducer from "./components/codeDoodle/stackSlice";
import classesReducer from "./components/codeDoodle/classSlice";
import anchorReducer from "./components/anchor/anchorSlice";
import heapReducer from './components/codeDoodle/heapSlice';
import staticReducer from './components/codeDoodle/staticSlice';

export default configureStore({
  reducer: {
    arrow: arrowReducer,
    stack: stackReducer,
    classes: classesReducer,
    anchors: anchorReducer,
    heap: heapReducer,
    stat: staticReducer,
  },
});
