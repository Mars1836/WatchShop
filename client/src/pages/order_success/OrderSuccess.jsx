import React, { useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import classNames from "classnames/bind";
import styles from "./ordersuccess.module.scss";
import RequireAuth from "../../services/RequireAuth/RequireAuth";
import KeyboardBackspace from "@mui/icons-material/KeyboardBackspace";
import routes from "../../utils/configs/routes";
import Button from "../../components/Button/Button";

const cx = classNames.bind(styles);
function OrderSuccess() {
  return (
    <RequireAuth>
      <div className={cx("order_form")}>
        <DefaultLayout>
          <div className={cx("wrapper")}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <p>Chưa có sản phẩm nào trong danh sách yêu thích.</p>
              <Button
                to={routes.home.path}
                variant="outline"
                style={{
                  padding: "8px",
                  fontSize: "13px",
                  fontWeight: "500",
                  borderWidth: "2px",
                  borderColor: "var(--orange-1)",
                  color: "var(--orange-1)",
                  borderRadius: "0",
                  textTransform: "uppercase",
                }}
              >
                <KeyboardBackspace
                  sx={{ fontSize: "19px" }}
                ></KeyboardBackspace>
                Tiếp tục xem sản phẩm
              </Button>
            </div>
          </div>
        </DefaultLayout>
      </div>
    </RequireAuth>
  );
}

export default OrderSuccess;
