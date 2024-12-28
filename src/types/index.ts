export type PrimitiveType = string | number | boolean | null;
export const Aggregator = {
  SUM: "sum",
  COUNT: "count",
  AVERAGE: "average",
  MIN: "min",
  MAX: "max",
} as const;

export type SortDirection = "asc" | "desc";

export type Row<T> = {
  label: keyof T;
  direction: SortDirection;
  inclusions?: Row<T>[];
};

export type ValueType<T> = {
  label: keyof T;
  direction: SortDirection;
  alias?: string;
  aggregator: keyof typeof Aggregator;
  formatter?: (value: PrimitiveType) => string;
  fn?: (
    data: T[],
    label: keyof T,
    recordLabel: T[keyof T],
    vlabel: keyof T
  ) => string;
};

export type Column<T> = {
  label: keyof T;
  inclusions?: string[];
};
