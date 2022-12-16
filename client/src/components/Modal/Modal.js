import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import classNames from "classnames/bind";
function Modal({ children, open, onClose, ref }) {
  console.log(ref);
  const cx = classNames.bind(styles);
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [open]);
  return ReactDOM.createPortal(
    <>
      {open && (
        <div className={cx("model")} onClick={onClose}>
          <div
            className={cx("fit")}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </div>
          <span className={cx("exist_btn")} onClick={onClose}>
            <CloseIcon className={cx("icon")} />
          </span>
        </div>
      )}
    </>,
    document.querySelector("body")
  );
}
export default Modal;
