import { IconProps } from ".";

const ChevronDown = ({
  height,
  width,
  fill = "transparent",
  stroke = "#000",
  className = "cursor-pointer",
}: IconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      height={`${height}px`}
      width={`${width}px`}
      fill={fill}
      stroke={stroke}
      viewBox="0 0 100 100"
      opacity="1.0"
    >
      <line strokeWidth="10" x1="5.5" y1="32.5" x2="49" y2="76" />
      <line strokeWidth="10" x1="93" y1="32.5" x2="49.5" y2="76" />
    </svg>
  );
};

export default ChevronDown;
