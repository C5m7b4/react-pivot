import { FilterType } from "../../../types";

interface FiltersProps<T> {
  filters: FilterType<T>[];
  setFilters: (filters: FilterType<T>[]) => void;
}

const Filters = <T,>({ filters, setFilters }: FiltersProps<T>) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const fieldType = e.dataTransfer.getData("fieldType");
    const newFilter: FilterType<T> = {
      label: fieldType as keyof T,
    };
    const newFilters = [...filters, newFilter];
    setFilters(newFilters);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {};

  return (
    <div>
      <div className="font-medium">Filters</div>
      <div
        className="border rounded-md shadow-md p-2 min-h-[150px] max-h-[200px] overflow-y-auto"
        query-id="filters"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        {filters.map((f, i) => (
          <div
            key={`value-${i}`}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
          >
            <span>{String(f.label)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
