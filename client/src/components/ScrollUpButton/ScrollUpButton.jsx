import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./scrollUpButton.module.scss";
import classNames from "classnames/bind";
const style = {
  position: "fixed",
  bottom: "80px",
  right: "30px",
  color: "#fff",
  background: "var(--orange-1)",
  lineHeight: "0px",
  borderRadius: "100px",
  padding: "3px",
  border: "2px solid #EEE",
  cursor: "pointer",
  zIndex: 100,
};
const cx = classNames.bind(styles);
function ScrollUpButton() {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  function onScroll(e) {
    if (window.pageYOffset >= 400) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }
  function handleClick() {
    window.scrollTo({
      top: "0px",
      behavior: "smooth",
    });
  }

  return (
    <>
      {isShow && (
        <span
          className={cx("scroll_up_btn")}
          style={style}
          onClick={handleClick}
        >
          <KeyboardArrowUpIcon
            style={{
              fontSize: "30px",
            }}
          ></KeyboardArrowUpIcon>
        </span>
      )}
    </>
  );
}

export default ScrollUpButton;
