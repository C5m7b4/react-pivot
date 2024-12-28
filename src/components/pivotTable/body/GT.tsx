import { grandTotalSum, grandTotalCount } from "../../../utils/arrayUtils";

const GT = ({ values, data }) => {
  return (
    <tr style={{ borderTop: "2px solid black" }}>
      <td></td>
      <td>Grand Total</td>
      {values.map((v, index) => {
        let total = 0;
        switch (v.aggregator) {
          case "Count":
            total = grandTotalCount(data);
            break;
          case "Sum":
            total = grandTotalSum(data, v.label);
            break;
          default:
            total = grandTotalSum(data, v.label);
            break;
        }
        return (
          <td key={`gt-${index}`} style={{ fontWeight: "bold" }}>
            {total}
          </td>
        );
      })}
    </tr>
  );
};

export default GT;
