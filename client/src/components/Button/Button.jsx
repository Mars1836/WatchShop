import React from "react";
import "./button.scss";
import { Link } from "react-router-dom";
function Button({ href, to, variant, children, style }) {
  const types = ["text", "underline"];
  const props = {
    href,
    to,
    variant,
    style,
  };
  let Com = "button";
  if (href) {
    Com = "a";
  } else if (to) {
    Com = Link;
  }
  return (
    <Com className="button" {...props}>
      {children}
      {variant === "contained" && <div className="overlay"></div>}
    </Com>
  );
}

export default Button;
