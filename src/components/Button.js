import SVGIcon from "@/src/components/SVGIcon.js";
import { IconWrapper, StyledButton } from "@/src/components/styles/StyledButton";

export default function Button({ $variant = "primary", startIcon, endIcon, children, onClick, ...props }) {
  return (
    <StyledButton $variant={$variant} onClick={onClick} {...props}>
      {startIcon && (
        <IconWrapper start="true">
          <SVGIcon iconName={startIcon} $variant={$variant} />
        </IconWrapper>
      )}
      {children}
      {endIcon && (
        <IconWrapper end="true">
          <SVGIcon iconName={endIcon} $variant={$variant} />
        </IconWrapper>
      )}
    </StyledButton>
  );
};

