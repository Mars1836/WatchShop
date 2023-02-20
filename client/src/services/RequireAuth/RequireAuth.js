import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./requireAuth.module.scss";
import Button from "../../components/Button/Button";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal";
import LoginForm from "../../components/LoginForm/LoginForm";
const cx = classNames.bind(styles);
function RequireAuth({ children }) {
  const isAuth = useSelector((state) => state.user.auth);
  const [isShowModalLogin, setIsShowModalLogin] = useState(false);

  const handleModelLoginOpen = () => {
    setIsShowModalLogin(true);
  };
  const handleModelLoginClose = () => {
    setIsShowModalLogin(false);
  };
  return (
    <div>
      {isAuth ? (
        <div>{children}</div>
      ) : (
        <div className={cx("wrapper")}>
          <Modal open={isShowModalLogin} onClose={handleModelLoginClose}>
            <LoginForm></LoginForm>
          </Modal>
          Bạn cần
          <Button
            variant="text"
            animate="none"
            onClick={handleModelLoginOpen}
            style={{ fontSize: "inherit", color: "blue", margin: "0 0.4rem" }}
          >
            đăng nhập
          </Button>
          trước.
        </div>
      )}
    </div>
  );
}

export default RequireAuth;
