import {icons} from "@/src/assets/Icons.js"

export default function SVGIcon({ variant, color = 'var(--neutrals-dark-gray)', size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icons[variant].viewBox}
      fill={color}
      width={size}
    >
      <title>{icons[variant].title}</title>
      <path d={icons[variant].path} />
    </svg>
  );
}