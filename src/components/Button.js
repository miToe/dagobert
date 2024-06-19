import SVGIcon from "@/src/components/SVGIcon.js"
import { ButtonStyled, IconWrapper } from "@/src/components/styles/ButtonStyled";

export default function Button ({$variant = 'primary', startIcon, endIcon, children, onClick, ...props }) {
  return (
    <ButtonStyled $variant={$variant} onClick={onClick} {...props}>
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
    </ButtonStyled>
  );
};

