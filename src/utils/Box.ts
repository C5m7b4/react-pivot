export const Box = <T>(x: T[] | T) => ({
  map: <R>(f: (value: T | T[]) => R) => Box(f(x)),
  fold: <R>(f: (value: T | T[]) => R) => f(x),
  trace: () => {
    console.log("internal trace: ", x);
    return Box(x);
  },
  inspect: () => "Box: (" + x + ")",
});
