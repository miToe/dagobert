import SVGIcon from "@/src/components/SVGIcon";
import styled from "styled-components";

const ButtonStyled = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  ${(props) =>
    props.$variant === "primary" &&
    `
    background-color: var(--primary-500);
    color: var(--neutrals-white);

    &:hover {
      background-color: var(--primary-700);
    }

    svg{
      fill:var(--neutrals-white);
    }
  `}

  ${(props) =>
    props.$variant === "secondary" &&
    `
    background-color: var(--primary-50);
    border: 2px solid var(--primary-500);
    color: var(--primary-500);

    &:hover {
      background-color: var(--primary-100);
    }
  `}
`;

const IconWrapper = styled.span`
  display: inline-flex;
  ${(props) => props.$start && "margin-right: 0.5rem;"}
  ${(props) => props.$end && "margin-left: 0.5rem;"}
`;

export default function Button({
  variant = "primary",
  startIcon,
  endIcon,
  children,
  onClick,
  ...props
}) {
  return (
    <ButtonStyled $variant={variant} onClick={onClick} {...props}>
      {startIcon && (
        <IconWrapper $start>
          <SVGIcon iconName={startIcon} variant={variant} />
        </IconWrapper>
      )}
      {children}
      {endIcon && (
        <IconWrapper $end>
          <SVGIcon iconName={endIcon} variant={variant} />
        </IconWrapper>
      )}
    </ButtonStyled>
  );
}
