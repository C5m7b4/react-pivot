import { Row } from "../../../types";
import { doesRowExist } from "../../../utils/arrayUtils";
import { getDragAfterElement } from "../../../utils/dragUtils";
import { ChevronDown } from "../Icons";
import { useClickOutside } from "../hooks/useClickOutside";

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
    console.log("dropped on rows");

    (e.target as HTMLDivElement).classList.remove("dragging");
    const fieldType = e.dataTransfer.getData("fieldType");
    const newRow: Row<T> = {
      label: fieldType as keyof T,
      direction: "asc",
    };
    console.log("created a new row");

    const isExisting = doesRowExist(rows, "label", fieldType);
    console.log("isExisting", isExisting);
    if (isExisting.found) {
      const copy = rows.filter((r) => r.label != fieldType);
      const container = document.querySelector('[query-id="filtered-rows"]');
      const afterElement = getDragAfterElement(
        container as HTMLDivElement,
        e.clientY
      );

      if (afterElement) {
        const pos = rows.findIndex((r) => (r.label = afterElement.innerHTML));
        copy.splice(pos, 0, newRow);
        console.log("setting rows, step 1");
        setRows(copy);
      }
    } else {
      const newRows = [...rows, newRow];
      console.log("setting rows, step 2");
      console.log(newRows);
      setRows(newRows);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("dragging over rows");
    e.preventDefault();
    (e.target as HTMLDivElement).style.border = "2px solid #00000";
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

  const handleShowOptions = (
    e: React.MouseEvent<HTMLSpanElement>,
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
        data-testid="filtered-rows"
        query-id="filtered-rows"
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
