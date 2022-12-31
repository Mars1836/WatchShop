import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import classNames from "classnames/bind";
function Modal({ children, open, onClose, position }) {
  const cx = classNames.bind(styles);
  const [isClosing, setIsClosing] = useState(false);
  let style = {};
  if (position === "center") {
    style = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
  }
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [open]);

  const hide = async (ms) => {
    setIsClosing(true);
    await new Promise((r) => setTimeout(r, 150));
    onClose();
    setIsClosing(false);
  };
  return ReactDOM.createPortal(
    <>
      {open && (
        <div
          className={cx("model", { closing: isClosing })}
          onClick={hide}
          style={style}
        >
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
