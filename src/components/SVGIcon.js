import React from "react";

export const icons = {
  add: {
    title: "add",
    viewBox: "0 0 24 24",
    path: "M11.25 12.75H5.5V11.25H11.25V5.5H12.75V11.25H18.5V12.75H12.75V18.5H11.25V12.75Z",
  },
  arrow_down: {
    title: "arrow_down",
    viewBox: "0 0 24 24",
    path: "M12 15.0538L6.34625 9.4L7.4 8.34625L12 12.9463L16.6 8.34625L17.6538 9.4L12 15.0538Z",
  },
  // ... (and other icons)
};

const getColorByVariant = (variant) => {
  switch (variant) {
    case "primary":
      return "var(--neutrals-white)";
    case "secondary":
      return "var(--primary-500)";
    default:
      return "var(--neutrals-dark-gray)";
  }
};

export default function SVGIcon({ iconName, variant, color, size = 24 }) {
  const icon = icons[iconName];

  if (!icon) {
    console.error(`Icon "${iconName}" not found.`);
    return null;
  }

  const iconColor = color || getColorByVariant(variant);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icon.viewBox}
      fill={iconColor}
      width={size}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}
