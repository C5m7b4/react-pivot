import { IconProps } from ".";

const SortZA = ({ height, width, stroke = "#000" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={`${height}px`}
      width={`${width}px`}
      stroke={stroke}
      fill="none"
      version="1.1"
      viewBox="0 0 100 100"
    >
      <rect x="3" y="3" width="94" height="93" rx="7.1" ry="7.1" />
      <path d="M15.4,70l-2.8,8.5h-3.6l9.2-27h4.2l9.2,27h-3.7l-2.9-8.5h-9.6ZM24.2,67.3l-2.6-7.8c-.6-1.8-1-3.4-1.4-4.9h0c-.4,1.6-.8,3.2-1.4,4.9l-2.6,7.8h8.1Z" />
      <path d="M9,38.3l15.4-22.5h0c0-.1-14-.1-14-.1v-3h18.7v2.2l-15.3,22.4h0c0,.1,15.5.1,15.5.1v3H9v-2.1Z" />
      <line x1="61" y1="11" x2="61" y2="85" />
      <line x1="75" y1="67" x2="61" y2="85" />
      <line x1="47" y1="67" x2="61" y2="85" />
    </svg>
  );
};

export default SortZA;
