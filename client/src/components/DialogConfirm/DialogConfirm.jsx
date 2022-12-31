import React from "react";
import styles from "./dialogConfirm.module.scss";
import classNames from "classnames/bind";
import Modal from "../Modal/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider } from "@mui/material";
function DialogConfirm({
  open,
  onClose = () => {},
  onYes,
  onCancel,
  option,
  title,
  type,
}) {
  const cx = classNames.bind(styles);
  console.log(open);
  return (
    <Modal open={open} onClose={onClose}>
      <div className={cx("dialog")}>
        <div className={cx("top")}>
          <div className={cx("head")}>
            <span className={cx("icon_wrap")}>
              <DeleteIcon className={cx("icon")} />
            </span>
            <div className={cx("title")}>Delete product</div>
          </div>

          <div className={cx("content")}>
            Are you sure you want to remove this product from the wishlist
          </div>
        </div>
        <Divider></Divider>
        <div className={cx("bottom")}>
          <button
            className={cx("yes")}
            onClick={() => {
              onYes();
              onClose();
            }}
          >
            Yes
          </button>
          <button
            className={cx("cancel")}
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DialogConfirm;
