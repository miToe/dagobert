import SVGIcon from "@/src/components/SVGIcon.js";
import { StyledIconButton } from "@/src/components/styles/StyledIconButton";

export function LinkedIcon({ onClick, iconName, ...props }) {
  return (
    <StyledIconButton onClick={onClick} {...props}>
      <SVGIcon iconName={iconName} />
    </StyledIconButton>
  );
};
