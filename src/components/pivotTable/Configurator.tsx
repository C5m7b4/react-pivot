import Values from "./dropTargets/Values";
import Fields from "./dropTargets/Fields";
import Rows from "./dropTargets/Rows";
import Filters from "./dropTargets/Filters";
import Columns from "./dropTargets/Columns";
import { Column, FilterType, Row, ValueType } from "../../types";
import { DoubleChevronRight } from "./Icons";
import { useState } from "react";

export interface ConfiguratorProps<T> {
  data: T[];
  rows: Row<T>[];
  setRows: (rows: Row<T>[]) => void;
  values: ValueType<T>[];
  setValues: (values: ValueType<T>[]) => void;
  filters: FilterType<T>[];
  setFilters: (filters: FilterType<T>[]) => void;
  columns: Column<T>[];
  setColumns: (columns: Column<T>[]) => void;
}

const Configurator = <T,>({
  data,
  rows,
  setRows,
  values,
  setValues,
  columns,
  setColumns,
  filters,
  setFilters,
}: ConfiguratorProps<T>) => {
  const [query, setQuery] = useState("");

  const handleExpanderClick = () => {
    const div = document.querySelector('[query-id="configurator"]');
    if (div) {
      const status = div.getAttribute("data-display");
      if (status === "expanded") {
        div.setAttribute("data-display", "collapsed");
      } else {
        div.setAttribute("data-display", "expanded");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div
      query-id="configurator"
      data-display="expanded"
      className="min-w-[350px] max-w-[350px] border ml-4 shadow-lg p-4 rounded-l-lg group
      data-[display=collapsed]:animate-slideOutRight data-[display=expanded]:animate-slideInFromRight"
    >
      <div className="flex gap-4">
        <div
          className="flex justify-center items-center"
          onClick={handleExpanderClick}
        >
          <DoubleChevronRight
            height={10}
            width={10}
            className="cursor-pointer group-data-[display=collapsed]:rotate-180 transition-all duration-300"
          />
        </div>
        <h3 className=" group-data-[display=collapsed]:hidden">
          PivotTable Fields
        </h3>
      </div>

      <div className=" group-data-[display=collapsed]:hidden">
        <div>
          <input
            className="w-full rounded-lg shadow-md pl-2 pr-8 border mb-2 
            focus:ring-1 f outline-none ring-blue-300"
            type="text"
            placeholder="search"
            value={query}
            onChange={handleChange}
          />
        </div>
        <div className="fields-container" query-id="fields-container">
          <Fields data={data} rows={rows} values={values} query={query} />
        </div>
        <div>
          <div className="text-sm font-medium text-center mt-2">
            Drag fields between areas below:
          </div>
          <div className="flex justify-between gap-4">
            <div className="w-1/2">
              <Filters filters={filters} setFilters={setFilters} />

              <Rows rows={rows} setRows={setRows} />
            </div>
            <div className="w-1/2">
              <Columns columns={columns} setColumns={setColumns} />

              <Values values={values} setValues={setValues} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
