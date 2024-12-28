import { useState, useRef, useEffect } from "react";
import { Box } from "../../../utils/Box";
import { unique } from "../../../utils/unique";
import { sort } from "../../../utils/sort";
import { Column, Row } from "../../../types";
import { useClickOutside } from "../hooks/useClickOutside";
import { SortAZ, SortZA } from "../Icons";

export interface UtilityContextProps<T> {
  rows: Row<T>[];
  data: T[];
  column: Column<T>;
  hide: () => void;
  handleSort: (key: keyof T, direction: "asc" | "desc") => void;
  inclusions: string[];
  setInclusions: (inclusions: string[]) => void;
}

const UtilityContext = <T,>({
  column,
  rows,
  data,
  hide,
  handleSort,
  inclusions,
  setInclusions,
}: UtilityContextProps<T>) => {
  const [filteredRows, setFilteredRows] = useState(rows);
  const [reset, setReset] = useState(false);
  const [sortKey, setSortKey] = useState<keyof T | undefined>(undefined);
  const ref = useClickOutside<HTMLDivElement>(() => {
    hide();
  });

  useEffect(() => {
    resetFilteredRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [reset]);

  const resetFilteredRows = () => {
    const filtered = Box<T[]>(data)
      .map((x) => unique(x as T[], column.label))
      .map((x) => sort(x as T[], column.label))
      .fold((x) => x);
    setFilteredRows(filtered as Row<T>[]);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      resetFilteredRows();
      return;
    }
    const newlyFilteredRows = filteredRows.filter((r) =>
      r[column.label]
        .toString()
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredRows(newlyFilteredRows);
  };

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    c: T[keyof T]
  ) => {
    if (c == "all") {
      setInclusions([]);
      column.inclusions = [];
    } else {
      if (e.target.checked) {
        if (!inclusions.includes(c as string)) {
          const copy = [...inclusions];
          copy.push(c as string);
          column.inclusions = copy;
          setInclusions(copy);
          setReset(!reset);
        }
      } else if (!e.target.checked) {
        if (inclusions.includes(c as string)) {
          const pos = inclusions.findIndex((r) => r === c);
          const inclusionsCopy = [...inclusions];
          inclusionsCopy.splice(pos, 1);
          column.inclusions = inclusionsCopy;
          setInclusions(inclusionsCopy);
          setReset(!reset);
        }
      }
    }
  };

  const handleOk = () => {
    hide();
  };

  return (
    <div ref={ref} className={`absolute border bg-white shadow-md p-4 `}>
      <select
        value={sortKey?.toString()}
        onChange={(e) => setSortKey(e.target.value as keyof T)}
        className="w-full mb-2 border rounded-lg shadow-md pl-2 py-1"
      >
        <option value="0">Select a Row</option>
        {rows.map((r, i) => (
          <option key={`uc-fr-${i}`} value={String(r.label)}>
            {String(r.label)}
          </option>
        ))}
      </select>
      <div
        className="font-medium flex cursor-pointer"
        onClick={() => handleSort(sortKey!, "asc")}
      >
        <span>
          <SortAZ height={20} width={20} />
        </span>
        <span className="ml-2">Sort from A to Z</span>
      </div>
      <div
        className="font-medium flex cursor-pointer"
        onClick={() => handleSort(sortKey!, "desc")}
      >
        <span>
          <SortZA height={20} width={20} />
        </span>
        <span className="ml-2">Sort from Z to A</span>
      </div>
      <div>
        <label className="font-medium font-sm">Search: </label>
        <input
          className="border rounded-lg shadow-md pl-2 py-1 "
          onChange={onChange}
        />
      </div>
      <div className="border rounded-lg shadow-md p-2 mt-4  min-h-[150px]">
        <div>
          <input
            type="checkbox"
            checked={inclusions.length === 0}
            onChange={(e) => handleSelect(e, "all")}
          />
          <label className="ml-2">Select All</label>
        </div>
        {filteredRows &&
          filteredRows.map((r, i) => {
            return (
              <div key={`r-u-${i}`}>
                <input
                  type="checkbox"
                  checked={inclusions.includes(r[column.label])}
                  onChange={(e) => handleSelect(e, r[column.label])}
                />
                <label className="ml-2">{r[column.label]}</label>
              </div>
            );
          })}
      </div>
      <div className="flex justify-between mt-4">
        <div></div>
        <div className="flex gap-4">
          <div
            onClick={handleOk}
            className="border-2 border-black rounded-lg shadow-md px-6 py-1 bg-slate-300
          hover:bg-slate-100 transition-all duration-500 cursor-pointer"
          >
            OK
          </div>
          <div
            onClick={hide}
            className="border-2 border-black rounded-lg shadow-md px-6 py-1 bg-slate-300
          hover:bg-slate-100 transition-all duration-500 cursor-pointer"
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityContext;
