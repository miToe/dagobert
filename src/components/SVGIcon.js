import {icons} from "@/src/assets/Icons.js"

const getColorByVariant = ($variant) => {
  switch ($variant) {
    case 'primary':
      return 'var(--neutrals-white)';
    case 'secondary':
      return 'var(--primary-500)';
    case 'inactive':
      return 'var(--neutrals-white)';
    default:
      return 'var(--neutrals-dark-gray)';
  }
};

export default function SVGIcon({iconName, $variant, size = 24}) {
  const iconColor = getColorByVariant($variant);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={icons[iconName].viewBox}
        fill={iconColor}
        width={size}
      >
        <title>{icons[iconName].title}</title>
        <path d={icons[iconName].path} />
      </svg>
    </>
  );
}