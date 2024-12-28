import { IconProps } from ".";

const MinusSquare = ({
  height,
  width,
  fill = "#000",
  stroke = "000",
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
    </svg>
  );
};

export default MinusSquare;
