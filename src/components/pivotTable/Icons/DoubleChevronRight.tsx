import { IconProps } from ".";

const DoubleChevronRight = ({
  height,
  width,
  fill = "transparent",
  stroke = "#000",
  className,
}: IconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={`${height}px`}
      width={`${width}px`}
      version="1.1"
      stroke={stroke}
      strokeWidth={6}
      fill={fill}
      viewBox="0 0 100 100"
    >
      <line x1="10.5" y1="8.5" x2="51" y2="48" />
      <line x1="42.5" y1="8.5" x2="83" y2="48" />
      <line x1="83.5" y1="48.5" x2="42.5" y2="89.5" />
      <line x1="51.5" y1="48.5" x2="10.5" y2="89.5" />
    </svg>
  );
};

export default DoubleChevronRight;
