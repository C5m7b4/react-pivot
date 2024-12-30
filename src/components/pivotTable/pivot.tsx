import { Row, SortDirection, ValueType } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import Tbody from "./TBody";
import Thead from "./Thead";
import { useState, useEffect } from "react";
import { Column } from "../../types";
import AliasModal from "./modals/AliasModel";
import FormatterModal from "./modals/FormatterModal";

export interface PivotProps<T> {
  data: T[];
  rows: Row<T>[];
  setRows: (rows: Row<T>[]) => void;
  values: ValueType<T>[];
  setValues: (values: ValueType<T>[]) => void;
  columns: Column<T>[];
}

const Pivot = <T,>({
  data,
  rows,
  setRows,
  values,
  setValues,
  columns,
}: PivotProps<T>) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  // const [showUtilityContext, setShowUtilityContext] = useState(false);
  // const [points, setPoints] = useState({ x: 0, y: 0 });
  const [column, setColumn] = useState<Column<T> | undefined>(undefined);
  const [showAliasModal, setShowAliasModal] = useState(false);
  const [showFormatterModal, setShowFormatterModal] = useState(false);
  const [aliasValue, setAliasValue] = useState("");
  const [formatterValue, setFormatterValue] = useState("");
  const [inclusions, setInclusions] = useState<string[]>([]);

  useEffect(() => {}, [inclusions]);

  const handleAliasClick = () => {
    setShowAliasModal(true);
    setShowContextMenu(false);
  };

  const handleFormatterClick = () => {
    setShowFormatterModal(true);
    setShowContextMenu(false);
  };

  const hideAliasModal = () => {
    setShowAliasModal(false);
  };

  const hideFormatterModal = () => {
    setShowFormatterModal(false);
  };

  // const handleContextMenu = (e, c) => {
  //   e.preventDefault();
  //   setPoints({ x: e.pageX, y: e.pageY });
  //   setColumn(c);
  //   setShowContextMenu(true);
  // };

  const handleAliasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAliasValue(e.target.value);
  };

  const handleFormatterChange = (e) => {
    setFormatterValue(e.target.value);
  };

  const handleAliasConfirm = () => {
    const selectedValue = values.filter(
      (v) => v.label.toString() === column!.label.toString()
    )[0];
    const pos = values.findIndex(
      (v) => v.label.toString() === column!.label.toString()
    );
    const newValues = [...values];
    newValues.splice(pos, 2, { ...selectedValue, alias: aliasValue });
    setValues(newValues);
    setShowContextMenu(false);
    setShowAliasModal(false);
    setColumn("");
    setAliasValue("");
  };

  const handleFormatterConfirm = () => {
    const selectedValue = values.filter((v) => v.label === column!.label)[0];
    const pos = values.findIndex((v) => v.label === column!.label);
    const newValues = [...values];
    let formatter = formatCurrency;
    switch (formatterValue) {
      case "Currency":
        formatter = formatCurrency;
        break;
      default:
        formatter = formatCurrency;
        break;
    }
    newValues.splice(pos, 1, { ...selectedValue, formatter: formatter });
    setValues(newValues);
    setShowContextMenu(false);
    setShowFormatterModal(false);
    setColumn("");
    setFormatterValue("");
  };

  const handleSort = (e: keyof T, dir: SortDirection = "asc") => {
    const selectedRow = rows.filter((r) => r.label === e)[0];
    const pos = rows.findIndex((r) => r.label === e);
    const newRow: Row<T> = {
      ...selectedRow,
      direction: dir,
    };
    const newRows = [...rows];
    newRows.splice(pos, 1, newRow);
    setRows(newRows);
  };

  return (
    <div className="border rounded-md shadow-md flex-1">
      {showAliasModal ? (
        <AliasModal
          isShowing={showAliasModal}
          hide={hideAliasModal}
          title={"Set Alias"}
          column={column!.label as string}
          value={aliasValue}
          onChange={handleAliasChange}
          confirm={handleAliasConfirm}
        />
      ) : null}
      {showFormatterModal ? (
        <FormatterModal
          isShowing={showFormatterModal}
          hide={hideFormatterModal}
          title={"Set Formatter"}
          column={column!.label.toString()}
          onChange={handleFormatterChange}
          confirm={handleFormatterConfirm}
        />
      ) : null}
      <div>
        <Thead
          rows={rows}
          data={data}
          values={values}
          column={column!}
          setRows={setRows}
          setColumn={setColumn}
          handleSort={handleSort}
          inclusions={inclusions}
          setInclusions={setInclusions}
          handleAliasClick={handleAliasClick}
          handleFormatterClick={handleFormatterClick}
          columns={columns}
        />
        <Tbody rows={rows} data={data} values={values} columns={columns} />
      </div>
    </div>
  );
};

export default Pivot;
