import React from "react";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

function Downloads() {
  return (
    <div>
      <h3 className={cx("title")}>Downloads</h3>
    </div>
  );
}

export default Downloads;
