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
  direction: SortDirection;
  fn?: (
    data: T[],
    label: keyof T,
    recordLabel: T[keyof T],
    vlabel: keyof T
  ) => string;
};

export type FilterType<T> = {
  label: keyof T;
};

export type Header = {
  title: string;
  type: "number" | "string" | "boolean" | "date" | "money";
  formatter: (value: string | number | boolean) => string;
  alias: string;
  visible: boolean;
  order: number;
  className?: string;
};
