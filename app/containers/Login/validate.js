export const validation = (state) => {
  const errors = new Map();
  if (!state.value1.length || !state.value2.length) {
    console.log("Fail cmnr >>", state);
    errors.set('error1', 'ABC');
    return errors;
  }

  return new Map();
}