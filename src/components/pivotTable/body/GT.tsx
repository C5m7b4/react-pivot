import { Column, ValueType } from "../../../types";
import {
  grandTotalSum,
  grandTotalCount,
  getColumnCount,
} from "../../../utils/arrayUtils";
import { Box } from "../../../utils/Box";
import { unique } from "../../../utils/unique";

interface GtProps<T> {
  values: ValueType<T>[];
  data: T[];
  columns: Column<T>[];
}

const GT = <T,>({ values, data, columns }: GtProps<T>) => {
  return (
    <div className={`grid ${getColumnCount(values, columns, data)} border-t`}>
      <div className="pl-6 font-medium">Grand Total</div>
      {columns.map((c, idx) => {
        const uniques = unique(data, c.label);
        return uniques.map((u, uidx) => {
          return values.map((v, vidx) => {
            const uniqueValues = Box<T[]>(data)
              .map((x) => x.filter((y) => y[c.label] === u[c.label]))
              .map((x) =>
                x.reduce((acc, cur) => {
                  return acc + Number(cur[v.label]);
                }, 0)
              )
              .fold((x) => x);
            return (
              <div
                key={`gt-${idx}-${vidx}-{$uidx}`}
                className="text-right font-medium px-4"
              >
                {uniqueValues}
              </div>
            );
          });
        });
      })}
      {values.map((v, index) => {
        let total = 0;
        switch (v.aggregator) {
          case "COUNT":
            total = grandTotalCount(data);
            break;
          case "SUM":
            total = grandTotalSum(data, v.label);
            break;
          default:
            total = grandTotalSum(data, v.label);
            break;
        }
        return (
          <div
            key={`gt-${index}`}
            style={{ fontWeight: "bold" }}
            className="text-right px-2"
          >
            {total}
          </div>
        );
      })}
    </div>
  );
};

export default GT;
