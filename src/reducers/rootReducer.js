const initialState = {
    anchorOnMoveToggle:false
};

function rootReducer(state = initialState, action) {
    switch(action.type){
        case 'anchor_moved':
            return {anchorOnMoveToggle:!state.anchorOnMoveToggle}
        default:
            return state;
    }
}

export default rootReducer;