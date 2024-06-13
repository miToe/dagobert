import IconsForButtons from "@/src/components/IconsForButtons";
import { ButtonStyled, IconWrapper } from "@/src/components/styles/ButtonStyled";

export default function Button ({$variant = 'primary', startIcon, endIcon, children, onClick, ...props }) {
  return (
    <ButtonStyled $variant={$variant} onClick={onClick} {...props}>
      {startIcon && (
        <IconWrapper start="true">
          <IconsForButtons iconName={startIcon} $variant={$variant} />
        </IconWrapper>
      )}
      {children}
      {endIcon && (
        <IconWrapper end="true">
          <IconsForButtons iconName={endIcon} $variant={$variant} />
        </IconWrapper>
      )}
    </ButtonStyled>
  );
};

