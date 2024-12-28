import Values from "./dropTargets/Values";
import Fields from "./dropTargets/Fields";
import Rows from "./dropTargets/Rows";
import Filters from "./dropTargets/Filters";
import Columns from "./dropTargets/Columns";
import { Row, ValueType } from "../../types";

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

const Configurator = <T,>({
  data,
  rows,
  setRows,
  values,
  setValues,
}: ConfiguratorProps<T>) => {
  return (
    <div className="min-w-[350px] max-w-[350px] border ml-4 shadow-lg p-4">
      <h3>PivotTable Fields</h3>
      <div>
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
