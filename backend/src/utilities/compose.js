export function compose (...funcs) {
  if (funcs.length === 0) {
    // If no functions return the identity
    return o => o;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  // const first = funcs[0];
  const last = funcs[funcs.length - 1];
  return (f) => {
    let result = last(f);
    for (let index = funcs.length - 2; index >= 0; index--) {
      // for (let index = 1; index < funcs.length; index++) {
      const fn = funcs[index];
      result = fn(result);
    }
    return result;
  };
}