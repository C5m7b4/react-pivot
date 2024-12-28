export const unique = <T>(array: T[], field: keyof T): T[] => {
  const newArray: T[] = [];
  const headers: T[keyof T][] = [];

  array.forEach((record) => {
    if (!headers.includes(record[field])) {
      headers.push(record[field]);
      newArray.push(record);
    }
  });

  return newArray;
};
