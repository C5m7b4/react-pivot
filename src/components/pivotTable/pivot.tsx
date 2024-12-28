import { Row, SortDirection, ValueType } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import HeaderContext from "./contexts/HeaderContext";
import Tbody from "./TBody";
import Thead from "./Thead";
import { useState, useEffect } from "react";
import { Column } from "../../types";

export interface PivotProps<T> {
  data: T[];
  rows: Row<T>[];
  setRows: (rows: Row<T>[]) => void;
  values: ValueType<T>[];
  setValues: (values: ValueType<T>[]) => void;
}

const Pivot = <T,>({
  data,
  rows,
  setRows,
  values,
  setValues,
}: PivotProps<T>) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  // const [showUtilityContext, setShowUtilityContext] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [column, setColumn] = useState<Column<T> | undefined>(undefined);
  const [showAliasModal, setShowAliasModal] = useState(false);
  const [showFormatterModal, setShowFormatterModal] = useState(false);
  const [aliasValue, setAliasValue] = useState("");
  const [formatterValue, setFormatterValue] = useState("");
  const [inclusions, setInclusions] = useState<string[]>([]);

  useEffect(() => {
    console.log("rendering due to exclusions change", inclusions);
  }, [inclusions]);

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

  const handleContextMenu = (e, c) => {
    e.preventDefault();
    setPoints({ x: e.pageX, y: e.pageY });
    setColumn(c);
    setShowContextMenu(true);
  };

  const handleAliasChange = (e) => {
    setAliasValue(e.target.value);
  };

  const handleFormatterChange = (e) => {
    setFormatterValue(e.target.value);
  };

  const handleAliasConfirm = () => {
    const selectedValue = values.filter((v) => v.label === column)[0];
    const pos = values.findIndex((v) => v.label === column);
    const newValues = [...values];
    newValues.splice(pos, 2, { ...selectedValue, alias: aliasValue });
    setValues(newValues);
    setShowContextMenu(false);
    setShowAliasModal(false);
    setColumn("");
    setAliasValue("");
  };

  const handleFormatterConfirm = () => {
    const selectedValue = values.filter((v) => v.label === column)[0];
    const pos = values.findIndex((v) => v.label === column);
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
    newValues.splice(pos, 2, { ...selectedValue, formatter: formatter });
    setValues(newValues);
    setShowContextMenu(false);
    setShowFormatterModal(false);
    // setColumn("");
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
      {/* {showContextMenu ? (
        <HeaderContext
          top={points.y}
          left={points.x}
          column={column}
          handleAliasClick={handleAliasClick}
          handleFormatterClick={handleFormatterClick}
        />
      ) : null} */}
      {/* {showUtilityContext ? (
        <UtilityContext
          top={points.y}
          left={points.x}
          column={column}
          rows={rows}
          data={data}
          hide={() => setShowUtilityContext(false)}
        />
      ) : null} */}
      {/* {showAliasModal ? (
        <AliasModal
          isShowing={showAliasModal}
          hide={hideAliasModal}
          title={"Set Alias"}
          column={column}
          value={aliasValue}
          onChange={handleAliasChange}
          confirm={handleAliasConfirm}
        />
      ) : null} */}
      {/* {showFormatterModal ? (
        <FormatterModal
          isShowing={showFormatterModal}
          hide={hideFormatterModal}
          title={"Set Formatter"}
          column={column}
          onChange={handleFormatterChange}
          confirm={handleFormatterConfirm}
        />
      ) : null} */}
      <div
        className=""
        // onClick={() => {
        //   setShowContextMenu(false);
        //}}
      >
        <Thead
          rows={rows}
          data={data}
          // setShowContextMenu={setShowContextMenu}
          // handleSortDirection={handleSortDirection}
          values={values}
          // handleContextMenu={handleContextMenu}
          column={column!}
          setRows={setRows}
          setColumn={setColumn}
          handleSort={handleSort}
          inclusions={inclusions}
          setInclusions={setInclusions}
        />
        <Tbody
          rows={rows}
          data={data}
          values={values}
          inclusions={inclusions}
          setInclusions={setInclusions}
        />
      </div>
    </div>
  );
};

export default Pivot;
