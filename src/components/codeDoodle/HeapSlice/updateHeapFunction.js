export default function updateHeapFunction(state, action) {
    console.log(action.payload);
    state.heap = action.payload;
  }
  