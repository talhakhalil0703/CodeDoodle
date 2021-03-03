export default function updateStackFunction(state, action) {
  console.log(action.payload);
  state.stack = action.payload;
}
