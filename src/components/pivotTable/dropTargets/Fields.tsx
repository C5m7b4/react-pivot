import { useState, useEffect } from "react";
import { Row, ValueType } from "../../../types";

export interface FieldsProps<T> {
  data: T[];
  rows: Row<T>[];
  values: ValueType<T>[];
}

const Fields = <T,>({ data, rows, values }: FieldsProps<T>) => {
  const [usedFields, setUsedFields] = useState<(keyof T)[] | undefined>([]);

  useEffect(() => {
    const valueFields = values.map((v) => v.label);
    const rowFields = rows.map((r) => r.label);
    setUsedFields([...rowFields, ...valueFields]);
  }, [rows, values]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    fieldType: keyof T
  ) => {
    e.dataTransfer.setData("fieldType", fieldType as string);
    e.dataTransfer.effectAllowed = "copyMove";
    (e.target as HTMLDivElement).style.border = "1px solid #070707";
    (e.target as HTMLDivElement).style.borderRadius = "10px";
    (e.target as HTMLDivElement).style.opacity = "0.8";
  };

  const handleCheck = () => {};

  const firstRecord: T = data[0];
  console.log("firstRecord", firstRecord, "rows", rows);

  const hasBorder = (r: keyof T) => {
    if (usedFields) {
      return usedFields!.includes(r) ? "border-2 border-green-400" : "";
    } else {
      return "'";
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-2">
      {Object.keys(firstRecord as object).map((r, i) => (
        <div
          className={`cursor-pointer mb-1`}
          key={`field-${i}`}
          style={{ border: hasBorder(r as keyof T) }}
          draggable
          onDragStart={(e) => handleDragStart(e, r as keyof T)}
        >
          <input
            type="checkbox"
            className="mr-2 ml-2"
            checked={usedFields!.includes(r as keyof T) ? true : false}
            onChange={handleCheck}
          />
          <label className="cursor-pointer">{r}</label>
        </div>
      ))}
    </div>
  );
};

export default Fields;
