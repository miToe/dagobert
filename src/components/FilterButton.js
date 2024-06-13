import { icons } from "@/src/assets/Icons";

export default function FilterButton({ iconName, size = 24, filterApplied = false }) {
  const iconColor = filterApplied ? "var(--primary-500)" : "var(--neutrals-mid-gray)";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icons[iconName].viewBox}
      fill={iconColor}
      width={size}
    >
      <title>{icons[iconName].title}</title>
      <path d={icons[iconName].path} />
    </svg>
  );
}
