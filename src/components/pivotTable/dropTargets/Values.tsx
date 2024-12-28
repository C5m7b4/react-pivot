import { ValueType } from "../../../types";
import {
  aggregateOptions,
  arrAvg,
  arrCount,
  arrSum,
} from "../../../utils/arrayUtils";
import type { Aggregator } from "../../../types";

export interface ValuesProps<T> {
  values: ValueType<T>[];
  setValues: (values: ValueType<T>[]) => void;
}

const Values = <T,>({ values, setValues }: ValuesProps<T>) => {
  const handleSelectChange = (
    label: string | number | symbol,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedAggregate = values.filter((v) => v.label === label)[0];
    const index = values.findIndex((v) => v.label === label);
    let currentFn = arrSum;
    let currentDescription: keyof typeof Aggregator = "SUM";
    switch (e.target.value) {
      case "Count":
        currentFn = arrCount;
        currentDescription = "COUNT";
        break;
      case "Sum":
        currentFn = arrSum;
        currentDescription = "SUM";
        break;
      case "Avg":
        currentFn = arrAvg;
        currentDescription = "AVERAGE";
        break;
      default:
        currentFn = arrSum;
        break;
    }
    const newValue = {
      ...selectedAggregate,
      aggregator: currentDescription,
      fn: currentFn,
    };
    const newValues = [...values];
    newValues.splice(index, 1, newValue);
    setValues(newValues);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const fieldType = e.dataTransfer.getData("fieldType");
    const newValue: ValueType<T> = {
      aggregator: "SUM",
      label: fieldType as keyof T,
      fn: arrSum,
      direction: "asc",
    };
    const newValues = [...values, newValue];
    setValues(newValues);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {};

  return (
    <div>
      <div className="font-medium">Values</div>
      <div
        className="border rounded-md shadow-md p-2 min-h-[150px] max-h-[200px] overflow-y-auto"
        query-id="filter-values"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        {values.map((v, i) => (
          <div
            key={`value-${i}`}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
          >
            <span>{String(v.label)}</span>
            <span>
              <select
                value={v.aggregator}
                onChange={(e) => handleSelectChange(v.label, e)}
              >
                {aggregateOptions.map((o, i) => {
                  return (
                    <option key={`option-${i}`} value={o.label}>
                      {o.label}
                    </option>
                  );
                })}
              </select>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Values;
