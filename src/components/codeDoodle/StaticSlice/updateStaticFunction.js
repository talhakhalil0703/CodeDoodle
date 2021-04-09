export default function updateStaticFunction(state, action) {
    console.log(action.payload);
    state.stat = action.payload;
  }
  