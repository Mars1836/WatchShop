import React from "react";
import styles from "./thumbnail.module.scss";
import classNames from "classnames/bind";
function Thumbnail({ children, img, position, style, className }) {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("thumbnail", `${className}`)} style={{ ...style }}>
      <div
        className={cx("background")}
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: `${position ? position : "right"}`,
        }}
      ></div>
      <div className={cx("overlay")}>{children}</div>
    </div>
  );
}

export default Thumbnail;
