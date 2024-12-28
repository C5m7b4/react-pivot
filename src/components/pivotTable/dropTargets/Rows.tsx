import { Row } from "../../../types";
import { doesRowExist } from "../../../utils/arrayUtils";
import { ChevronDown } from "../Icons";
import { useClickOutside } from "../hooks/useClickOutside";
import { useState } from "react";

export interface RowProps<T> {
  rows: Row<T>[];
  setRows: (rows: Row<T>[]) => void;
}

const Rows = <T,>({ rows, setRows }: RowProps<T>) => {
  const ref = useClickOutside<HTMLDivElement>(() => {
    if (ref.current) {
      ref.current.setAttribute("data-display", "closed");
    }
  });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    (e.target as HTMLDivElement).classList.remove("dragging");
    const fieldType = e.dataTransfer.getData("fieldType");
    const newRow = {
      label: fieldType,
      direction: "asc",
    };

    const isExisting = doesRowExist(rows, "label", fieldType);
    if (isExisting.found) {
      const copy = rows.filter((r) => r.label != fieldType);
      const afterElement = getDragAfterElement(
        document.querySelector('[query-id="filtered-rows"]'),
        e.clientY
      );

      if (afterElement) {
        const pos = rows.findIndex((r) => (r.label = afterElement.innerHTML));
        copy.splice(pos, 0, newRow);
        setRows(copy);
      }
    } else {
      const newRows = [...rows, newRow];
      setRows(newRows);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLDivElement).style.border = "2px solid #009879";
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    fieldType: Row<T>
  ) => {
    e.dataTransfer.setData("fieldType", String(fieldType.label));
    (e.target as HTMLDivElement).style.border = "1px solid #000";
    (e.target as HTMLDivElement).style.opacity = "0.8";
    (e.target as HTMLDivElement).classList.add("dragging");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // @ts-expect-error cannot use null for border
    (e.target as HTMLDivElement).style.border = null;
  };

  const getDragAfterElement = (container: HTMLDivElement, y: number) => {
    const draggableElements = [
      ...container.querySelectorAll(".draggable-item:not(.dragging)"),
    ];

    const el = draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return { offset: 0, element: closest };
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    );

    // @ts-expect-error investigate this
    return el.element;
  };

  const handleShowOptions = (
    e: React.MouseEvent<HTMLDivElement>,
    row: Row<T>
  ) => {
    const div = document.querySelector(
      `[query-id="query-${row.label.toString()}"]`
    );

    const rect = div!.getBoundingClientRect();
    if (ref.current && div) {
      ref.current.style.top = `${e.clientY - 50}px`;
      ref.current.style.left = `${rect.left}px`;
      ref.current.setAttribute("data-display", "open");
      ref.current.onclick = () => {
        if (ref.current) {
          const copy = rows.filter((r) => r.label != row.label);
          ref.current.setAttribute("data-display", "closed");
          setRows(copy);
        }
      };
    }
  };
  return (
    <div>
      <div className="font-medium">Rows</div>
      <div
        className="border rounded-md shadow-md p-1 min-h-[150px] max-h-[200px] overflow-y-auto"
        id="filtered-rows"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        {rows.map((r, i) => (
          <div
            query-id={`query-${r.label.toString()}`}
            draggable
            onDragStart={(e) => handleDragStart(e, r)}
            onDragLeave={(e) => handleDragLeave(e)}
            key={`row-${i}`}
            className="flex justify-between draggable-item border rounded-md shadow-sm px-2 mb-1"
          >
            <span>{String(r.label)}</span>
            <span
              className="flex justify-center items-center"
              onClick={(e) => handleShowOptions(e, r)}
            >
              <ChevronDown height={10} width={10} stroke="#000" />
            </span>
          </div>
        ))}
      </div>
      <div
        ref={ref}
        data-display="closed"
        className="absolute data-[display=closed]:animate-dissapear data-[display=open]:animate-appear
        border rounded-lg shadow-md px-2 py-1 bg-white"
      >
        <div className="cursor-pointer">Remove Field</div>
      </div>
    </div>
  );
};

export default Rows;
