import React, { useEffect, useState } from "react";
import styles from "./cart.module.scss";
import classNames from "classnames/bind";
import DefaultLayout from "../../layout/DefaultLayout";
import { Grid } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "../../components/Button/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSelector, useDispatch } from "react-redux";
import useAsyncData from "../../utils/hooks/asyncData";
import cartRequest from "../../requests/cart";
import { actionCartApi } from "../../redux/actions/cart";
import routes from "../../utils/configs/routes";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RequireAuth from "../../services/RequireAuth/RequireAuth";
function Cart() {
  const cx = classNames.bind(styles);
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const [num, setNum] = useState(() => {
    return {};
  });
  const [isUpdating, setIsUpdating] = useState(false);
  function removeCartItem(cartItemId) {
    dispatch(actionCartApi.removeFromCart(cartItemId));
  }
  function updateCart() {}
  function handleIncrease(id) {
    setNum({
      ...num,
      ["item" + id]: num["item" + id] + 1,
    });
    setIsUpdating(true);
  }
  function handleDecrease(id) {
    if (num["item" + id] <= 0) {
      return;
    }
    setNum({
      ...num,
      ["item" + id]: num["item" + id] - 1,
    });
    setIsUpdating(true);
  }
  function handleUpdateCart() {
    const arr = Object.keys(num);
    let carts = [];
    for (const [key, value] of Object.entries(num)) {
      carts.push({
        id: Number(key.slice(4)),
        quantity: value,
      });
    }
    setIsUpdating(false);
    dispatch(actionCartApi.updateQuantityInCart(carts));
  }
  function handleOrderProduct() {
    console.log("asd");
  }
  useEffect(() => {
    if (!cart?.cart_items) {
      return;
    }
    let a = cart.cart_items.reduce((accumulator, currentValue) => {
      return {
        ...accumulator,
        ["item" + currentValue.id]: currentValue.quantity,
      };
    }, {});
    if (!a) {
      return;
    }
    setNum(a);
  }, [cart]);
  return (
    <div className={cx("cart_page")}>
      <DefaultLayout>
        <RequireAuth>
          <div className={cx("container")}>
            <Grid container spacing={4} justifyContent={"center"}>
              <Grid item xs={12} sm={10} md={8}>
                <div>
                  <table className={cx("cart_table")}>
                    <tbody>
                      <tr>
                        <th></th>
                        <th>Sản Phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                      </tr>
                      {cart &&
                        cart?.cart_items.map((item) => {
                          return (
                            <tr key={item.id}>
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
                                    onClick={() => {
                                      removeCartItem(item.id);
                                    }}
                                  >
                                    <ClearIcon></ClearIcon>
                                  </Button>
                                </div>
                              </td>
                              <td>
                                <div className={cx("product_cell")}>
                                  <img src={item.product.img} alt={""}></img>
                                  <span>{item.product.name}</span>
                                </div>
                              </td>

                              <td>{item.product.price}</td>
                              <td>
                                <div className={cx("quantity_form")}>
                                  <p> {num["item" + item.id]}</p>
                                  <div>
                                    <button
                                      onClick={() => {
                                        handleIncrease(item.id);
                                      }}
                                    >
                                      <ArrowDropUpIcon
                                        className={cx("icon")}
                                      ></ArrowDropUpIcon>
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleDecrease(item.id);
                                      }}
                                    >
                                      <ArrowDropDownIcon
                                        className={cx("icon")}
                                      ></ArrowDropDownIcon>
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td>{item.product.price * item.quantity}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "20px" }}
                  >
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
                      <KeyboardBackspaceIcon
                        sx={{ fontSize: "19px" }}
                      ></KeyboardBackspaceIcon>{" "}
                      Tiếp tục xem sản phẩm
                    </Button>
                    <Button
                      disabled={!isUpdating}
                      style={{
                        borderRadius: "0px",
                        padding: "8px",
                        textTransform: "uppercase",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                      onClick={handleUpdateCart}
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
                    onClick={handleOrderProduct}
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
        </RequireAuth>
      </DefaultLayout>
    </div>
  );
}

export default Cart;
