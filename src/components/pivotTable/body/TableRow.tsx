import { useState, useEffect } from "react";
import { Box } from "../../../utils/Box";
import { unique } from "../../../utils/unique";
import { ValueType, Row } from "../../../types";
import { PlusSquare, MinusSquare } from "../Icons";
import { sort } from "../../../utils/sort";

export interface TableRowProps<T> {
  i: number;
  idx: number;
  record: T extends Record<string, T> ? T : never;
  values: ValueType<T>[];
  data: T[];
  row: Row<T>;
  rows: Row<T>[];
}

const TableRow = <T,>({
  i,
  idx,
  record,
  values,
  data,
  row,
  rows,
}: TableRowProps<T>) => {
  const [expanded, setExpanded] = useState(true);
  const [subrows, setSubrows] = useState<T[]>([]);

  useEffect(() => {
    getSubrows(row.label, record[row.label], rows[i + 1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const getSubrows = (field: keyof T, value: T[keyof T], subvalue: Row<T>) => {
    if (!subvalue) {
      setSubrows([]);
      return [];
    }
    const subkey = subvalue.label;
    const result = Box<T[]>(data)
      .map((x) => x.filter((y) => (y as T)[field] == value))
      .map((x) => unique(x as T[], subkey))
      .map((x) => sort(x as T[], subvalue.label, subvalue.direction))
      .fold((x) => x);

    setSubrows(result as T[]);
  };

  const toggle = () => {
    setExpanded(!expanded);
  };

  const getSubValuesSum = (
    key1: keyof T,
    value1: T[keyof T],
    key2?: keyof T,
    value2?: T[keyof T],
    aggregateKey?: keyof T
  ) => {
    const result = Box<T[]>(data)
      .map((x) => x.filter((y) => y[key1] == value1))
      .map((x) => x.filter((y) => y[key2] == value2))
      .map((x) =>
        x.reduce((acc, cur) => {
          // @ts-expect-error not sure about the type
          return acc + cur[aggregateKey];
        }, 0)
      )
      .fold((x) => x);
    return result;
  };

  const getSubValueCount = (
    key1: keyof T,
    value1: T[keyof T],
    key2: keyof T,
    value2: T[keyof T]
  ) => {
    const result = Box<T[]>(data)
      .map((x) => x.filter((y) => (y as T)[key1] == value1))
      .map((x) => x.filter((y) => (y as T)[key2] == value2))
      .map((x) =>
        x.reduce((acc) => {
          return acc + 1;
        }, 0)
      )
      .fold((x) => x);
    return result;
  };

  return (
    // find out if there are any subrows for this row
    <div>
      <div
        key={`tr-cell-${i}-${idx}`}
        className={`grid grid-cols-${values.length + 1} gap-4 border-b`}
      >
        <div className="mr-2 flex" onClick={toggle}>
          {expanded ? (
            <MinusSquare
              height={12}
              width={12}
              fill="transparent"
              stroke="#000"
              className="mt-1 mr-2 ml-2 cursor-pointer"
            />
          ) : (
            <PlusSquare
              height={12}
              width={12}
              fill="transparent"
              stroke="#000"
              className="mt-1 mr-2 ml-2 cursor-pointer"
            />
          )}

          {Object.keys(record).map((k, index) => {
            if (k === row.label) {
              return (
                <div key={`fd-r-${idx}-${index}`} className="font-medium">
                  {String(record[k])}
                </div>
              );
            }
          })}
        </div>

        {/* render out all value filter fields */}
        {values.map((v, index) => {
          const sumOfCell = v.fn!(data, row.label, record[row.label], v.label);
          return (
            <div
              key={`tr-cell-${i}-${idx}-${index}`}
              className="text-right px-2 font-medium"
            >
              {v.formatter ? v.formatter(sumOfCell) : sumOfCell}
            </div>
          );
        })}
      </div>
      {expanded &&
        subrows.map((sr, index) => {
          return (
            <div
              key={`sr-${i}-${idx}-${index}`}
              className={`ml-6 grid grid-cols-${values.length + 1} gap-4`}
            >
              {Object.keys(sr as T[]).map((k, index) => {
                if (k === rows[i + 1]?.label) {
                  return (
                    <div key={`sr-r-${idx}-${index}`}>{`${
                      sr[k as keyof T]
                    }`}</div>
                  );
                }
              })}
              {values.map((v, idx2) => {
                let sum: number | number[] = 0;

                if (v.aggregator == "SUM") {
                  sum = getSubValuesSum(
                    rows[0].label,
                    sr[rows[0].label],
                    rows[1] ? rows[1].label : null,
                    rows[1] ? sr[rows[1].label] : null,
                    v.label
                  );
                } else if (v.aggregator == "COUNT") {
                  sum = getSubValueCount(
                    rows[0].label,
                    sr[rows[0].label],
                    rows[1].label,
                    sr[rows[1].label]
                  );
                }

                return (
                  <div
                    key={`sr-v-${i}-${idx}-${idx2}`}
                    className="text-right px-2 text-sm"
                  >
                    {v.formatter ? v.formatter(sum as number) : sum}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default TableRow;
