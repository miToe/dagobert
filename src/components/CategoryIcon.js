import { IconWrapper } from "@/src/components/styles/List";
import { categories } from "@/src/data/categories";
import SVGIcon from "@/src/components/SVGIcon";

export function CategoryIcon({ category }) {
  const categoryData = categories[category];

  if (!categoryData) {
    return null;
  }

  return (
    <IconWrapper $backgroundColor={categoryData.background}>
      <SVGIcon
        iconName={categoryData.title}
        iconColor={categoryData.color}
      />
    </IconWrapper>
  );
}
