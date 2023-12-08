import React from "react"
import "./button.scss"
import { Link } from "react-router-dom"
import { CircularProgress } from "@mui/material"
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
  loading,
  size,
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
    size,
  }
  let Com = "button"
  if (href) {
    Com = "a"
  } else if (to) {
    Com = Link
  }

  return (
    <Com className={`button ${className}`} {...props} disabled={loading}>
      {children}
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
            color: "black",
          }}
        />
      )}
    </Com>
  )
}

export default Button
