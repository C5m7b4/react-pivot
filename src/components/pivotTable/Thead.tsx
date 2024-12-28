import { Column, Row, ValueType } from "../../types";
import UtilityContext from "./contexts/UtilityContext";
import { ChevronDown } from "./Icons";
import { useState, useRef } from "react";

export interface THeadProps<T> {
  rows: Row<T>[];
  data: T[];
  values: ValueType<T>[];
  column: Column<T>;
  setRows: (rows: Row<T>[]) => void;
  setColumn: (column: Column<T>) => void;
  handleSort: (key: keyof T, direction: "asc" | "desc") => void;
  inclusions: string[];
  setInclusions: (inclusions: string[]) => void;
}

const Thead = <T,>({
  rows,
  data,
  values,
  column,
  setColumn,
  handleSort,
  inclusions,
  setInclusions,
}: THeadProps<T>) => {
  const [showUtilityContext, setShowUtilityContext] = useState(false);
  const utilityRef = useRef<HTMLDivElement>(null);

  const closeUtilityContext = () => {
    setShowUtilityContext(false);

    if (utilityRef.current) {
      utilityRef.current.setAttribute("data-display", "closed");
    }
  };

  const setShowContextMenu = () => {
    setShowUtilityContext(true);
    if (utilityRef.current) {
      utilityRef.current.setAttribute("data-display", "open");
    }
  };

  const handleSortDirection = (c: Row<T>) => {
    setColumn(c);
    if (utilityRef.current) {
      if (showUtilityContext) {
        utilityRef.current.setAttribute("data-display", "closed");
      } else {
        utilityRef.current.setAttribute("data-display", "open");
      }
    }
    setTimeout(() => {
      setShowUtilityContext(!showUtilityContext);
    }, 500);
  };

  const handleSortLocal = (key: keyof T, direction: "asc" | "desc") => {
    handleSort(key, direction);
    if (utilityRef.current) {
      if (showUtilityContext) {
        utilityRef.current.setAttribute("data-display", "closed");
      } else {
        utilityRef.current.setAttribute("data-display", "open");
      }
    }
    setTimeout(() => {
      setShowUtilityContext(!showUtilityContext);
    }, 500);
  };

  return (
    <div>
      <div
        className={`relative grid grid-cols-${
          values.length + 1
        } font-medium text-lg border-b gap-4 pl-2`}
      >
        {rows.map((r, i) => {
          if (i > 0) {
            // only print out the first row becuase everything else will be nested
            return;
          }
          if (inclusions!.includes(r.label.toString().toLowerCase())) {
            return;
          }
          return (
            <div
              className="flex gap-4 border-r"
              key={`th-${i}`}
              onContextMenu={(e) => {
                e.preventDefault();
                setShowContextMenu();
              }}
            >
              <span> {r.label.toString()}</span>
              <span
                className="cursor-pointer"
                onClick={() => handleSortDirection(r)}
              >
                <div className="flex justify-center items-center place-items-center">
                  <ChevronDown height={10} width={10} className="mt-1" />
                </div>
              </span>
            </div>
          );
        })}
        {values.map((v, idx) => (
          <div
            className=""
            key={`th-v-${idx}`}
            // onContextMenu={(e) => {
            //   // handleContextMenu(e, String(v.label));
            // }}
          >
            {v.alias ? v.alias : `${v.aggregator} of ${String(v.label)}`}
          </div>
        ))}
      </div>
      <div
        ref={utilityRef}
        data-display="closed"
        className="data-[display=open]:animate-appear data-[display=closed]:animate-dissapear"
      >
        {showUtilityContext ? (
          <UtilityContext
            rows={rows}
            data={data}
            column={column}
            hide={closeUtilityContext}
            handleSort={handleSortLocal}
            inclusions={inclusions}
            setInclusions={setInclusions}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Thead;
