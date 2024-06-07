import React from 'react';
import SVGIcon from "@/src/components/SVGIcon";

export default function Button ({ variant = 'primary', startIcon, endIcon, children, onClick, ...props }) {
  const buttonClass = `button button-${variant}`;

  return (
    <button type="button" className={buttonClass} onClick={onClick} {...props}>
      {startIcon && <SVGIcon iconName={startIcon} variant={variant} className="button-icon start-icon" />}
      <span className="button-label">{children}</span>
      {endIcon && <SVGIcon iconName={endIcon} variant={variant} className="button-icon end-icon" />}
    </button>
  );
};


