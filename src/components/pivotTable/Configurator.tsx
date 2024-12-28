import Values from "./dropTargets/Values";
import Fields from "./dropTargets/Fields";
import Rows from "./dropTargets/Rows";
import Filters from "./dropTargets/Filters";
import Columns from "./dropTargets/Columns";
import { Row, ValueType } from "../../types";
import { DoubleChevronRight } from "./Icons";

export interface ConfiguratorProps<T> {
  data: T[];
  rows: Row<T>[];
  setRows: (rows: Row<T>[]) => void;
  values: ValueType<T>[];
  setValues: (values: ValueType<T>[]) => void;
  filters: string[];
  setFilters: (filters: string[]) => void;
  columns: string[];
  setColumns: (columns: string[]) => void;
}

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

const Configurator = <T,>({
  data,
  rows,
  setRows,
  values,
  setValues,
}: ConfiguratorProps<T>) => {
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
        <div className="rounded-lg shadow-md pl-2 pr-8 border mb-2">
          <input type="text" placeholder="search" />
        </div>
        <div className="fields-container" query-id="fields-container">
          <Fields data={data} rows={rows} values={values} />
        </div>
        <div>
          <div className="text-sm font-medium text-center mt-2">
            Drag fields between areas below:
          </div>
          <div className="flex justify-between gap-4">
            <div className="w-1/2">
              <Filters />

              <Rows rows={rows} setRows={setRows} />
            </div>
            <div className="w-1/2">
              <Columns />

              <Values values={values} setValues={setValues} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
