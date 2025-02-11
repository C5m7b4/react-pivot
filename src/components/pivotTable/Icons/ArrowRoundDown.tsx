import { IconProps } from "./index";

const ArrowRoundDown = ({
  height,
  width,
  fill = "#000",
  className,
}: IconProps) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={`${height}px`}
      width={`${width}px`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 490.4 490.4"
    >
      <g>
        <g>
          <path
            d="M490.4,245.2C490.4,110,380.4,0,245.2,0S0,110,0,245.2s110,245.2,245.2,245.2S490.4,380.4,490.4,245.2z M24.5,245.2
			c0-121.7,99-220.7,220.7-220.7s220.7,99,220.7,220.7s-99,220.7-220.7,220.7S24.5,366.9,24.5,245.2z"
          />
          <path
            d="M253.9,360.4l68.9-68.9c4.8-4.8,4.8-12.5,0-17.3s-12.5-4.8-17.3,0l-48,48V138.7c0-6.8-5.5-12.3-12.3-12.3
			s-12.3,5.5-12.3,12.3v183.4l-48-48c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l68.9,68.9c2.4,2.4,5.5,3.6,8.7,3.6
			S251.5,362.8,253.9,360.4z"
          />
        </g>
      </g>
    </svg>
  );
};

export default ArrowRoundDown;
