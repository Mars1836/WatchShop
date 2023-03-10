import React from "react";
import "./button.scss";
import { Link } from "react-router-dom";
function Button({
  href,
  to,
  variant,
  children,
  style,
  type,
  onClick,
  animate,
  className,
  disabled,
}) {
  const props = {
    href,
    to,
    variant,
    style,
    type,
    onClick,
    animate,
    disabled,
  };
  let Com = "button";
  if (href) {
    Com = "a";
  } else if (to) {
    Com = Link;
  }

  return (
    <Com className={`button ${className}`} {...props}>
      <div>{children}</div>
    </Com>
  );
}

export default Button;
