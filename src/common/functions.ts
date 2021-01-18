export const bindFunctions = (thisObj: any, functions: any) => {
  if (thisObj && functions) {
    functions.forEach(f => (thisObj[f] = thisObj[f].bind(thisObj)));
  }
};
