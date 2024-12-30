import { Column } from "../../../types";
import { arrSum, doesRowExist } from "../../../utils/arrayUtils";
import { getDragAfterElement } from "../../../utils/dragUtils";
import { useClickOutside } from "../hooks/useClickOutside";
import { ChevronDown } from "../Icons";

interface ColumnProps<T> {
  columns: Column<T>[];
  setColumns: (columns: Column<T>[]) => void;
}

const Columns = <T,>({ columns, setColumns }: ColumnProps<T>) => {
  const ref = useClickOutside<HTMLDivElement>(() => {
    if (ref.current) {
      ref.current.setAttribute("data-display", "closed");
    }
  });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    (e.target as HTMLDivElement).classList.remove("dragging");
    const fieldType = e.dataTransfer.getData("fieldType");
    const newColumn: Column<T> = {
      label: fieldType as keyof T,
      direction: "asc",
      inclusions: [],
      fn: arrSum,
    };

    const isExisting = doesRowExist(columns, "label", fieldType);
    if (isExisting.found) {
      const copy = columns.filter((r) => r.label != fieldType);
      const afterElement = getDragAfterElement(
        document.querySelector('[query-id="columns"]')!,
        e.clientY
      );

      if (afterElement) {
        const pos = columns.findIndex(
          (r) => (r.label = afterElement.innerHTML)
        );
        copy.splice(pos, 1, newColumn);
        setColumns(copy);
      }
    } else {
      const newColumns = [...columns, newColumn];
      setColumns(newColumns);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLDivElement).style.border = "2px solid #000000";
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    fieldType: Column<T>
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

  const handleShowOptions = (
    e: React.MouseEvent<HTMLSpanElement>,
    column: Column<T>
  ) => {
    const div = document.querySelector(
      `[query-id="query-${column.label.toString()}"]`
    );

    const rect = div!.getBoundingClientRect();
    if (ref.current && div) {
      ref.current.style.top = `${e.clientY - 50}px`;
      ref.current.style.left = `${rect.left}px`;
      ref.current.setAttribute("data-display", "open");
      ref.current.onclick = () => {
        if (ref.current) {
          const copy = columns.filter((r) => r.label != column.label);
          ref.current.setAttribute("data-display", "closed");
          setColumns(copy);
        }
      };
    }
  };

  return (
    <div>
      <div className="font-medium">Columns</div>
      <div
        className="border rounded-md shadow-md p-2 min-h-[150px] max-h-[200px] overflow-y-auto"
        query-id="columns"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        {columns.map((c, i) => (
          <div
            query-id={`query-${c.label.toString()}`}
            draggable
            onDragStart={(e) => handleDragStart(e, c)}
            onDragLeave={(e) => handleDragLeave(e)}
            key={`column-${i}`}
            className="flex justify-between draggable-item border rounded-md shadow-sm px-2 mb-1"
          >
            <span>{String(c.label)}</span>
            <span
              className="flex justify-center items-center"
              onClick={(e) => handleShowOptions(e, c)}
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

export default Columns;
