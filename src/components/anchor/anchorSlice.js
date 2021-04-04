import React from "react";
import { createSlice } from "@reduxjs/toolkit";

export const anchorSlice = createSlice({
  name: "anchors",
  initialState: {
      // an anchors ID is their index in this list
    anchorList: [],
    nextAvailableID: 0,
  },
  reducers: {
    // adds anchor at next available index
    addAnchor: (state) => {
        let newList = [...state.anchorList, {
            ID:state.nextAvailableID,
            connected: false,
        }]

        state.anchorList = newList
        state.nextAvailableID = state.nextAvailableID + 1
    },
    deleteAnchor: (state, action) => {
        for(let i = 0; i < state.anchorList.length; i++){
            if(state.anchorList[i].ID === action.payload.ID){
                state.anchorList.splice(i, 1)
                state.anchorList = [...state.anchorList]
            }
        }
    },
  },
});

// above is reducer functions, below is the actions.
export const { addAnchor, deleteAnchor } = anchorSlice.actions;

//Hand off the state here
export const selectAnchorList = (state) => state.anchors.anchorList;

// imported by the store
export default anchorSlice.reducer;
