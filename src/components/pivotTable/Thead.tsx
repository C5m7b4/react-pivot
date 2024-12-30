import { Column, Row, ValueType } from "../../types";
import UtilityContext from "./contexts/UtilityContext";
import { ChevronDown } from "./Icons";
import { useState, useRef } from "react";
import HeaderContext from "./contexts/HeaderContext";
import { unique } from "../../utils/unique";
import {
  getColumnCount,
  getUniqueColumns,
  getUniqueColumnValues,
} from "../../utils/arrayUtils";

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
  handleAliasClick: (column: string) => void;
  handleFormatterClick: (column: string) => void;
  columns: Column<T>[];
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
  handleAliasClick,
  handleFormatterClick,
  columns,
}: THeadProps<T>) => {
  const [showUtilityContext, setShowUtilityContext] = useState(false);
  const [showHeaderContext, setShowHeaderContext] = useState(false);
  const utilityRef = useRef<HTMLDivElement>(null);
  const headerContextRef = useRef<HTMLDivElement>(null);

  const closeUtilityContext = () => {
    setShowUtilityContext(false);

    if (utilityRef.current) {
      utilityRef.current.setAttribute("data-display", "closed");
    }
  };

  const setShowContextMenu = (
    e: React.MouseEvent<HTMLDivElement>,
    r: Row<T>
  ) => {
    const headerDiv = document.querySelector('[query-id="table-header"]');
    const c: Column<T> = {
      label: r.label,
    };
    setColumn(c);

    if (headerContextRef.current && headerDiv) {
      const rect = headerDiv.getBoundingClientRect();
      headerContextRef.current.style.top = `${rect.bottom}px`;
      headerContextRef.current.style.left = `${e.clientX}px`;
      headerContextRef.current.setAttribute("data-display", "open");
    }
    setShowHeaderContext(true);
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
        className={`relative grid ${getColumnCount(
          values,
          columns,
          data
        )} font-medium text-lg border-b gap-4 pl-2`}
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
              query-id="table-header"
              className="flex gap-4 border-r cursor-context"
              key={`th-${i}`}
              onContextMenu={(e) => {
                e.preventDefault();
                setShowContextMenu(e, r);
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

        {columns.map((column, i) => {
          const uniques = getUniqueColumns(data, column.label);
          return uniques.map((u, idx) => {
            return (
              <div
                key={`col-${i}-${idx}`}
                className="cursor-context border-r text-right px-2"
              >
                {String(u[column.label])}
              </div>
            );
          });
        })}

        {values.map((v, idx) => (
          <div
            className="cursor-context text-right px-2"
            key={`th-v-${idx}`}
            onContextMenu={(e) => {
              e.preventDefault();
              setShowContextMenu(e, v);
            }}
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
      <div
        data-display="closed"
        ref={headerContextRef}
        className="absolute w-[200px] bg-white
           data-[display=open]:animate-appear data-[display=closed]:animate-dissapear"
      >
        {showHeaderContext ? (
          <HeaderContext
            top={0}
            left={0}
            column={column}
            handleFormatterClick={handleFormatterClick}
            setShowHeaderContext={(b: boolean) => {
              if (headerContextRef.current) {
                headerContextRef.current.setAttribute("data-display", "closed");
              }
              setTimeout(() => {
                setShowHeaderContext(b);
              }, 500);
            }}
            handleAliasClick={handleAliasClick}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Thead;
