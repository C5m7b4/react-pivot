export interface HeaderContextProps {
  top: number;
  left: number;
  column: string;
  handleAliasClick: (column: string) => void;
  handleFormatterClick: (column: string) => void;
}

const HeaderContext = ({
  top,
  left,
  column,
  handleAliasClick,
  handleFormatterClick,
}: HeaderContextProps) => {
  return (
    <div
      className={`absolute border rounded-md shadow-md top-[${top}px] left-[${left}px] bg-white`}
    >
      {/* <div style={{ minHeight: "5px" }}>&nbsp;</div> */}
      <div className="header-element" onClick={() => handleAliasClick(column)}>
        Create alias
      </div>
      <div
        className="header-element"
        onClick={() => handleFormatterClick(column)}
      >
        Add Formatter
      </div>
    </div>
  );
};

export default HeaderContext;
