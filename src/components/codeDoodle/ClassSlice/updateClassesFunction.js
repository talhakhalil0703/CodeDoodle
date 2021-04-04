export default function updateClassesFunction (state, action) {
    state.value.push(action.payload);
  }