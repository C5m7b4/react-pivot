import { Header } from "../../App";

export interface NormalTableProps<T extends object> {
  data: T[];
  headers: Header[];
}

const NormalTable = <T extends object>({
  data,
  headers,
}: NormalTableProps<T>) => {
  if (data.length === 0) {
    return <div>No data available</div>;
  }
  const sortedHeaders = headers.sort((a, b) => a.order - b.order);

  return (
    <table className="m-auto w-full">
      <thead>
        <tr className="bg-slate-500 text-white">
          {sortedHeaders.map((key, i) => {
            if (key.visible) {
              return (
                <th key={`thead-${i}`} className={key.className}>
                  {key.alias}
                </th>
              );
            }
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((record, idx) => (
          <tr key={`tbody-tr-${idx}}`} className="odd:bg-slate-200 ">
            {headers.map((header, idx) => {
              const column = record[header.title as keyof T];
              if (header.visible) {
                return (
                  <td key={`td-${idx}`} className={header.className}>
                    {header.formatter(String(column))}
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NormalTable;
