import { data, iData } from "./data/index";
import PivotTable from "./components/pivotTable/PivotTable";
import { formatDate, formatCurrency } from "./utils/formatters";
import { Header } from "./types";

const headers: Header[] = [
  {
    title: "index",
    type: "number",
    formatter: (v: string | number | boolean) => v.toString(),
    alias: "index",
    visible: false,
    order: 6,
    className: "text-left",
  },
  {
    title: "guid",
    type: "string",
    formatter: (v: string | number | boolean) => v.toString(),
    alias: "guid",
    visible: false,
    order: 7,
    className: "text-left",
  },
  {
    title: "isLoyalty",
    type: "boolean",
    formatter: (v: string | number | boolean) => v.toString(),
    alias: "Loyalty",
    visible: true,
    order: 5,
    className: "text-center uppercase",
  },
  {
    title: "revenue",
    type: "money",
    formatter: (v: string | number | boolean) => formatCurrency(v.toString()),
    alias: "Revenue",
    visible: true,
    order: 2,
    className: "text-center",
  },
  {
    title: "cookieType",
    type: "string",
    formatter: (v: string | number | boolean) => v.toString(),
    alias: "Type",
    visible: true,
    order: 0,
    className: "text-left",
  },
  {
    title: "company",
    type: "string",
    formatter: (v: string | number | boolean) => v.toString(),
    alias: "Company",
    visible: true,
    order: 1,
    className: "text-left",
  },
  {
    title: "unitsSold",
    type: "number",
    formatter: (v: string | number | boolean) => v.toString(),
    alias: "Qty",
    visible: true,
    order: 3,
    className: "text-center",
  },
  {
    title: "orderDate",
    type: "date",
    formatter: (v: string | number | boolean) => formatDate(v.toString()),
    alias: "Date",
    visible: true,
    order: 4,
    className: "text-center",
  },
];

function App() {
  return (
    <div className="p-6">
      <PivotTable<iData> data={data} headers={headers} />
    </div>
  );
}

export default App;
