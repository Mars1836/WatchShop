import React from "react";
import styles from "./cart.module.scss";
import classNames from "classnames/bind";
import DefaultLayout from "../../layout/DefaultLayout";
import { Grid } from "@mui/material";
import products from "../../data/products";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "../../components/Button/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
function Cart() {
  const product0 = products[0];
  const cx = classNames.bind(styles);

  return (
    <div className={cx("cart_page")}>
      <DefaultLayout>
        <div className={cx("container")}>
          <Grid container spacing={4} justifyContent={"center"}>
            <Grid item xs={12} sm={10} md={8}>
              <div>
                <table className={cx("cart_table")}>
                  <tr>
                    <th></th>
                    <th>Sản Phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng</th>
                  </tr>
                  <tr>
                    <td
                      style={{
                        marign: 0,
                        padding: 0,
                      }}
                    >
                      <div
                        style={{
                          marign: 0,
                          padding: 0,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant={"text"}
                          style={{ color: "var(--text-dart-1)" }}
                        >
                          <ClearIcon></ClearIcon>
                        </Button>
                      </div>
                    </td>
                    <td>
                      <div className={cx("product_cell")}>
                        <img src={product0.img} alt={""}></img>
                        <span>{product0.name}</span>
                      </div>
                    </td>

                    <td>{product0.price}</td>
                    <td>1</td>
                    <td>{product0.price}</td>
                  </tr>
                </table>
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "20px" }}
                >
                  <Button
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
                    <KeyboardBackspaceIcon
                      sx={{ fontSize: "19px" }}
                    ></KeyboardBackspaceIcon>{" "}
                    Tiếp tục xem sản phẩm
                  </Button>
                  <Button
                    disabled
                    style={{
                      borderRadius: "0px",
                      padding: "8px",
                      textTransform: "uppercase",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    Cập nhật giỏ hàng
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={10} md={4}>
              <div className={cx("right")}>
                <p className={cx("title")}>TỔNG SỐ LƯỢNG </p>
                <div className={cx("list")}>
                  <div className={cx("item")}>
                    <span>Tổng phụ</span>
                    <span className={cx("price")}>100000</span>
                  </div>
                  <div className={cx("item")}>
                    <span>Giao hàng</span>
                    <span>
                      <p>Giao hàng miễn phí</p>
                      <p>Ước tính cho Việt Name</p>
                      <p>Đổi địa chỉ </p>
                    </span>
                  </div>
                  <div className={cx("item")}>
                    <span>Tổng</span>
                    <span className={cx("price")}>100000</span>
                  </div>
                </div>
                <Button
                  variant={"contained"}
                  style={{
                    margin: "20px 0",
                    borderRadius: "0px",
                    width: "100%",
                    padding: "10px",
                    textTransform: "uppercase",
                    backgroundColor: "var(--orange-2)",
                  }}
                >
                  Tiến hành thanh toán
                </Button>
                <div className={cx("voucher_form")}>
                  <div className={cx("title")}>Phiếu ưu đãi</div>
                  <input type={"text"} placeholder="Mã ưu đãi"></input>
                  <button>Áp dụng</button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </DefaultLayout>
    </div>
  );
}

export default Cart;
