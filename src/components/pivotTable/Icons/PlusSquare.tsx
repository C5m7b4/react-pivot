import { IconProps } from ".";

const PlusSquare = ({
  height = 20,
  width = 20,
  fill = "transparent",
  stroke = "#000",
  className = "cursor-pointer",
}: IconProps) => {
  return (
    <svg
      className={className}
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 100 100"
      fill={fill}
      stroke={stroke}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5.5" y="4.5" width="88" height="92" rx="8" ry="8" />
      <line strokeWidth={6} x1="15.5" y1="49.5" x2="84.5" y2="49.5" />
      <line strokeWidth={6} x1="50" y1="84" x2="50" y2="15" />
    </svg>
  );
};

export default PlusSquare;
