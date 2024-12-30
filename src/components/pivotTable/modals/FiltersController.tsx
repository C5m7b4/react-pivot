import ReactDOM from "react-dom";
import { FilterType, Header } from "../../../types";
import { useRef } from "react";
import { unique } from "../../../utils/unique";

interface FiltersControllerProps<T> {
  filters: FilterType<T>[];
  headers: Header[];
  data: T[];
}

const FiltersController = <T,>({
  filters,
  headers,
  data,
}: FiltersControllerProps<T>) => {
  const hide = () => {
    if (ref.current) {
      ref.current.setAttribute("data-display", "hidden");
    }
  };
  const ref = useRef<HTMLDivElement>(null);

  const renderComponent = (f: FilterType<T>, i: number) => {
    const header = headers.find((h) => h.title === String(f.label));
    const uniqueValues = unique(data, f.label);
    return uniqueValues.map((v, idx) => {
      return (
        <div key={`filter-${i}-${idx}`}>
          <div>{String(v[f.label])}</div>
        </div>
      );
    });
  };

  const handleExpand = () => {
    if (ref.current) {
      ref.current.setAttribute("data-display", "showing");
    }
  };

  return filters.length > 0
    ? ReactDOM.createPortal(
        <div
          ref={ref}
          data-display="showing"
          className="transition-all duration-500 
                data-[display=showing]:animate-slideDown data-[display=hidden]:animate-slideUp"
          style={{
            position: "fixed",
            top: 0,
            left: "50%",
            transform: `translateX(-50%)`,
            display: "inline-block",
            width: "400px",
          }}
          aria-modal
          tabIndex={-1}
          role="dialog"
        >
          <div className="bg-slate-100 rounded-lg shadow-lg">
            <div className="border-b-2 flex justify-between items-center px-2 py-1">
              <span className="font-medium">Filters</span>
              <span>
                <button
                  type="button"
                  className="border px-2 rounded-md shadow-sm bg-white hover:bg-slate-200 transition-all duration-500"
                  data-dismiss="modal"
                  onClick={hide}
                >
                  <span aria-hidden="true">X</span>
                </button>
              </span>
            </div>
            <div className="p-4 ">
              <div className="max-h-[200px] overflow-y-scroll overflow-x-hidden">
                {filters.map((f, i) => renderComponent(f, i))}
              </div>
              <div className="flex mt-2 border-t justify-between gap-4 px-6">
                <div
                  className="border my-2 py-1 px-8 rounded-lg shadow-md cursor-pointer hover:bg-slate-200 transition-all duration-500"
                  onClick={hide}
                >
                  Cancel
                </div>
                <div
                  className="border my-2 py-1 px-8 rounded-lg shadow-md cursor-pointer hover:bg-slate-200 transition-all duration-500"
                  onClick={confirm}
                >
                  OK
                </div>
              </div>
            </div>
            <div
              className="w-full text-right px-6 cursor-pointer"
              onClick={handleExpand}
            >
              ?
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default FiltersController;
