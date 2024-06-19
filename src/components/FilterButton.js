import { StyledFilterButton } from "@/src/components/styles/StyledFilterButton";
import SVGIcon from "@/src/components/SVGIcon";

export function FilterButton({ onClick, iconName, ...props }) {
  return (
    <StyledFilterButton onClick={onClick} {...props}>
      <SVGIcon iconName={iconName} />
    </StyledFilterButton>
  );
};
