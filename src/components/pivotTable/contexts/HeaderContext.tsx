import { Column } from "../../../types";
import { useClickOutside } from "../hooks/useClickOutside";

export interface HeaderContextProps<T> {
  top: number;
  left: number;
  column: Column<T>;
  handleAliasClick: (column: string) => void;
  handleFormatterClick: (column: string) => void;
  setShowHeaderContext: (show: boolean) => void;
}

const HeaderContext = <T,>({
  top,
  left,
  column,
  handleAliasClick,
  handleFormatterClick,
  setShowHeaderContext,
}: HeaderContextProps<T>) => {
  const ref = useClickOutside<HTMLDivElement>(() => {
    setShowHeaderContext(false);
  });

  return (
    <div
      ref={ref}
      className={`absolute border rounded-b-md shadow-md top-[${top}px] left-[${left}px] bg-white flex flex-col gap-2`}
    >
      <div
        onClick={() => {
          handleAliasClick(String(column.label || column));
        }}
        className="cursor-pointer hover:bg-slate-200 transition-all duration-500 pl-2 py-1 pr-4"
      >
        Create alias
      </div>
      <div
        onClick={() => handleFormatterClick(String(column.label))}
        className="cursor-pointer hover:bg-slate-200 transition-all duration-500 pl-2 py-1 pr-4"
      >
        Add Formatter
      </div>
    </div>
  );
};

export default HeaderContext;
