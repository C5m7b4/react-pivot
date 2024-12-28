export const arrSum = (arr, lookupField, lookupValue, valueField) => {
  return arr.reduce((acc, cur) => {
    if (cur[lookupField] === lookupValue) {
      return acc + Number(cur[valueField]);
    } else {
      return acc;
    }
  }, 0);
};

export const grandTotalSum = (arr, lookupField) => {
  const total = arr.reduce((acc, cur) => {
    return acc + Number(cur[lookupField]);
  }, 0);
  return total;
};

export const arrCount = (arr, lookupField, lookupValue) => {
  return arr.reduce((acc, cur) => {
    if (cur[lookupField] === lookupValue) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
};

export const grandTotalCount = (arr) => {
  return arr.reduce((acc) => {
    return acc + 1;
  }, 0);
};

export const arrAvg = (arr, lookupField, lookupValue, valueField) => {
  let itemCount = 0;
  const total = arr.reduce((acc, cur) => {
    if (cur[lookupField] === lookupValue) {
      itemCount++;
      return acc + Number(cur[valueField]);
    } else {
      return acc;
    }
  }, 0);
  return total / itemCount;
};

export const aggregateOptions = [
  {
    fn: arrSum,
    label: "Sum",
  },
  {
    fn: arrCount,
    label: "Count",
  },
  {
    fn: arrAvg,
    label: "Avg",
  },
];

export const doesRowExist = (arr, field, value) => {
  let i = 0;
  for (const el of arr) {
    if (el[field] == value) {
      return {
        found: true,
        record: el,
        index: i,
      };
    }
    i++;
  }
  return {
    found: false,
  };
};
