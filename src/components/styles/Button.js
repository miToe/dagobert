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

  ${(props) => props.variant === 'primary' && `
    background-color: var(--primary-500);
    color: var(--neutrals-white);

    &:hover {
      background-color: var(--primary-700);
    }
  `}

  ${(props) => props.variant === 'secondary' && `
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
  ${(props) => props.start && 'margin-right: 0.5rem;'}
  ${(props) => props.end && 'margin-left: 0.5rem;'}
`;

export default function Button ({ buttonVariant = 'primary', startIcon, endIcon, children, onClick, ...props }) {
  return (
    <ButtonStyled variant={buttonVariant} onClick={onClick} {...props}>
      {startIcon && (
        <IconWrapper start>
          <SVGIcon iconName={startIcon} variant={buttonVariant} />
        </IconWrapper>
      )}
      {children}
      {endIcon && (
        <IconWrapper end>
          <SVGIcon iconName={endIcon} variant={buttonVariant} />
        </IconWrapper>
      )}
    </ButtonStyled>
  );
};






/*export default function Button ({ variant = 'primary', startIcon, endIcon, children, onClick, ...props }) {
  const buttonClass = `button button-${variant}`;

  return (
    <button className={buttonClass} onClick={onClick} {...props}>
      {startIcon && <SVGIcon iconName={startIcon} variant={variant} className="button-icon start-icon" />}
      <span className="button-label">{children}</span>
      {endIcon && <SVGIcon iconName={endIcon} variant={variant} className="button-icon end-icon" />}
    </button>
  );
};

*/
