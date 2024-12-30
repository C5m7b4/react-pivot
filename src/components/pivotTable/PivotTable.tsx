import { useEffect, useState } from "react";
import NormalTable from "./NormalTable";
import Pivot from "./pivot";
import Configurator from "./Configurator";
import { Column, FilterType, Header, Row, ValueType } from "../../types";
import FiltersController from "./modals/FiltersController";

export interface PivotTableProps<T extends object> {
  data: T[];
  headers: Header[];
}

const PivotTable = <T extends object>({
  data,
  headers,
}: PivotTableProps<T>) => {
  const [rows, setRows] = useState<Row<T>[]>([]);
  const [filters, setFilters] = useState<FilterType<T>[]>([]);
  const [columns, setColumns] = useState<Column<T>[]>([]);
  const [values, setValues] = useState<ValueType<T>[]>([]);
  const [usePivot, setUsePivot] = useState(false);

  useEffect(() => {}, []);

  return (
    <div>
      <h3 data-testid="header-text">
        {usePivot ? "Pivot Table Example" : "Basic Table Example"}
      </h3>
      <FiltersController filters={filters} headers={headers} data={data} />
      <div className="mb-2 flex justify-between place-items-center">
        <div>
          Total Records:{" "}
          <span className="border rounded-lg shadow-md px-6 py-1 ml-2 bg-slate-200">
            {data.length}
          </span>
        </div>
        <div>
          Total Columns:{" "}
          <span className="border rounded-lg shadow-md px-6 py-1 ml-2 bg-slate-200">
            {Object.keys(data[0]).length}
          </span>
        </div>
        <div>
          <button
            className=" px-10 py-2 bg-slate-200 rounded-lg shadow-lg text-black ml-2 mr-4 font-medium"
            id="btnPivot"
            onClick={() => {
              setUsePivot(!usePivot);
            }}
          >
            {usePivot ? "UnPivot" : "Pivot"}
          </button>
        </div>
      </div>

      <div className="flex w-full mt-4">
        {usePivot ? (
          <Pivot
            data={data}
            rows={rows}
            setRows={setRows}
            values={values}
            setValues={setValues}
            columns={columns}
          />
        ) : (
          <NormalTable data={data} headers={headers} />
        )}
        {usePivot ? (
          <Configurator
            data={data}
            rows={rows}
            setRows={setRows}
            filters={filters}
            setFilters={setFilters}
            columns={columns}
            setColumns={setColumns}
            values={values}
            setValues={setValues}
            headers={headers}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PivotTable;
