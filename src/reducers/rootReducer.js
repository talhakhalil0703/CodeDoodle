const initialState = {
    anchorOnMoveToggle:false,
    anchors: [{divID:'anchor-1', initialPosition:{x:400,y:-300}}],
};
// anchors shows example of how to append payloads (upon clicking anchor button
// new anchor is added to state.anchors (with divID=2) sent by DrawingIcons.js)

function rootReducer(state = initialState, action) {
    if(state.anchors[1] !== undefined){alert(state.anchors[1].divID)}
    
    switch(action.type){
        case 'anchor_moved':
            return {
                ...state,
                anchorOnMoveToggle:!state.anchorOnMoveToggle,
            }
        case 'new_anchor':
            return {
                ...state,
                anchors:[...state.anchors, action.payload],
            }
        default:
            return state;
    }
}

export default rootReducer;