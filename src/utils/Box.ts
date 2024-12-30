// export const Box = <T>(x: T[] | T) => ({
//   map: <R>(f: (value: T | T[]) => R) => Box(f(x)),
//   fold: <R>(f: (value: T | T[]) => R) => f(x),
//   trace: () => {
//     console.log("internal trace: ", x);
//     return Box(x);
//   },
//   inspect: () => "Box: (" + x + ")",
// });

export const Box = <T>(x: T) => ({
  map: <U>(f: (value: T) => U) => Box(f(x)),
  flatMap: <U>(
    f: (value: T) => { map: (value: T) => U; fold: (value: T) => U }
  ) => f(x),
  filter: (predicate: (value: T) => boolean) =>
    predicate(x) ? Box(x) : Box(null as unknown as T),
  fold: <U>(f: (value: T) => U) => f(x),
  trace: () => {
    console.log("internal trace: ", x);
    return Box(x);
  },
  inspect: () => "Box: (" + x + ")",
});
