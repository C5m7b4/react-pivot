import { useEffect, useState } from "react";
import NormalTable from "./NormalTable";
import type { Header } from "../../App";
import Pivot from "./pivot";
import Configurator from "./Configurator";
import { Row, ValueType } from "../../types";

export interface PivotTableProps<T extends object> {
  data: T[];
  headers: Header[];
}

const PivotTable = <T extends object>({
  data,
  headers,
}: PivotTableProps<T>) => {
  const [rows, setRows] = useState<Row<T>[]>([]);
  const [filters, setFilters] = useState([]);
  const [columns, setColumns] = useState([]);
  const [values, setValues] = useState<ValueType<T>[]>([]);
  const [usePivot, setUsePivot] = useState(false);

  useEffect(() => {}, []);

  return (
    <div>
      <h3>Pivot Table Example</h3>

      <div className="mb-2 flex justify-between">
        <div>Total Records: {data.length}</div>
        <div>Total Columns: {Object.keys(data[0]).length}</div>
      </div>

      <div>
        <button
          className=" px-10 py-4 bg-slate-200 rounded-lg shadow-lg text-black ml-2 mr-4 font-medium"
          id="btnPivot"
          onClick={() => {
            setUsePivot(!usePivot);
          }}
        >
          {usePivot ? "UnPivot" : "Pivot"}
        </button>
      </div>

      <div className="flex w-full mt-4">
        {usePivot ? (
          <Pivot
            data={data}
            rows={rows}
            setRows={setRows}
            values={values}
            setValues={setValues}
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
          />
        ) : null}
      </div>
    </div>
  );
};

export default PivotTable;
