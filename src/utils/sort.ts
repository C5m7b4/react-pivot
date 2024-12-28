import { SortDirection } from "../types";

export const sort = <T>(
  arr: T[],
  field: keyof T,
  direction: SortDirection = "asc"
): T[] => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0][field];
  const pivotRecord = arr[0];
  const leftArr: T[] = [];
  const rightArr: T[] = [];

  if (direction === "asc") {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i][field] < pivot) {
        leftArr.push(arr[i]);
      } else {
        rightArr.push(arr[i]);
      }
    }
  } else {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i][field] > pivot) {
        leftArr.push(arr[i]);
      } else {
        rightArr.push(arr[i]);
      }
    }
  }

  return [...sort(leftArr, field), pivotRecord, ...sort(rightArr, field)];
};
