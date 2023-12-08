import React, { useEffect, useState } from "react"
import styles from "./cart.module.scss"
import classNames from "classnames/bind"
import DefaultLayout from "../../layout/DefaultLayout"
import { Grid } from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"
import Button from "../../components/Button/Button"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { useSelector, useDispatch } from "react-redux"

import { actionCartApi } from "../../redux/actions/cart"
import routes from "../../utils/configs/routes"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import RequireAuth from "../../services/RequireAuth/RequireAuth"
import { CircularProgress } from "@mui/material"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import handlePriceDiscount from "../../utils/function/handlePriceDiscount"
function Cart() {
  const cx = classNames.bind(styles)
  const cart = useSelector(state => state.cart.data)
  const cartLoading = useSelector(state => state.cart.loading)
  const dispatch = useDispatch()
  const [num, setNum] = useState(() => {
    return {}
  })
  const navigate = useNavigate()
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [totalPrice, setTotalPrice] = useState()
  const [voucherValue, setVoucherValue] = useState("")
  const [voucherLoading, setVoucherLoading] = useState(false)
  const [voucherDiscount, setVoucherDiscount] = useState(0)
  const shipPrice = 30000
  function removeCartItem(cartItemId) {
    dispatch(actionCartApi.removeFromCart(cartItemId))
  }
  useEffect(() => {
    console.log(num)
  }, [num])
  function handleIncrease(id) {
    setNum({
      ...num,
      [id]: num[id] + 1,
    })
    setIsLoadingUpdate(true)
  }
  function handleDecrease(id) {
    if (num[id] <= 1) {
      return
    }
    setNum({
      ...num,
      [id]: num[id] - 1,
    })
    setIsLoadingUpdate(true)
  }
  function handleUpdateCart() {
    const arr = Object.keys(num)
    let carts = []
    for (const [key, value] of Object.entries(num)) {
      carts.push({
        id: key,
        quantity: value,
      })
    }
    setIsLoadingUpdate(true)
    dispatch(actionCartApi.updateQuantityInCart(carts))
  }
  function handleVoucher(e) {
    setVoucherLoading(true)
    setTimeout(() => {
      setVoucherLoading(false)
      if (voucherValue === "123") {
        setVoucherDiscount(30000)
        return toast.success("Áp dụng mã thành công")
      }
      return toast.error("Áp dụng mã thất bại")
    }, 1000)
  }
  function handleChangeVoucher(e) {
    setVoucherValue(e.target.value)
  }
  function handleNavigateToOrderForm() {
    navigate(routes.order_form.path, {
      state: { totalPrice, voucherDiscount, shipPrice },
    })
  }
  useEffect(() => {
    if (!cart?.cart_items) {
      return
    }
    let a = cart.cart_items.reduce((accumulator, currentValue) => {
      return {
        ...accumulator,
        [currentValue.id]: currentValue.quantity,
      }
    }, {})
    if (!a) {
      return
    }
    console.log(a)
    const price = cart.cart_items.reduce((acc, item) => {
      return handlePriceDiscount(item.product) * item.quantity + acc
    }, 0)

    setTotalPrice(Number(price))
    setNum(a)
  }, [cart])
  return (
    <div className={cx("cart_page")}>
      <DefaultLayout>
        <RequireAuth>
          <div className={cx("container")}>
            {!cart?.cart_items.length ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
                <Button
                  to={routes.home.path}
                  variant='outline'
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
              </div>
            ) : (
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
                          cart?.cart_items.map(item => {
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
                                        removeCartItem(item.id)
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

                                <td className={cx("a")}>
                                  {!!item.product.discount &&
                                    item.product.discount > 0 && (
                                      <div
                                        className={cx("price", "origin_price")}
                                      >
                                        {item.product.price}
                                      </div>
                                    )}
                                  <div className={cx("price", "sale_price")}>
                                    {handlePriceDiscount(item.product)}
                                  </div>
                                </td>

                                <td>
                                  <div className={cx("quantity_form")}>
                                    <p> {num[item.id]}</p>
                                    <div>
                                      <button
                                        onClick={() => {
                                          handleIncrease(item.id)
                                        }}
                                      >
                                        <ArrowDropUpIcon
                                          className={cx("icon")}
                                        ></ArrowDropUpIcon>
                                      </button>
                                      <button
                                        disabled={num[item.id] <= 1}
                                        onClick={() => {
                                          handleDecrease(item.id)
                                        }}
                                      >
                                        <ArrowDropDownIcon
                                          className={cx("icon")}
                                        ></ArrowDropDownIcon>
                                      </button>
                                    </div>
                                  </div>
                                </td>
                                <td className={cx("price")}>
                                  {handlePriceDiscount(item.product) *
                                    item.quantity}
                                </td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "20px",
                      }}
                    >
                      <Button
                        to={routes.home.path}
                        variant='outline'
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
                        loading={cartLoading}
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
                        <span className={cx("price")}>{totalPrice}</span>
                      </div>
                      <div className={cx("item")}>
                        <span>Giao hàng</span>
                        <span className={cx("price")}>{shipPrice}</span>
                      </div>
                      <div className={cx("item")}>
                        <span>Voucher</span>
                        <span
                          className={cx("price")}
                          style={voucherDiscount ? { color: "crimson" } : {}}
                        >
                          {voucherDiscount ? (
                            <>{"- " + voucherDiscount}</>
                          ) : (
                            <>0</>
                          )}
                        </span>
                      </div>
                      <div className={cx("item")}>
                        <span>Tổng</span>
                        <span className={cx("price")}>
                          {String(totalPrice - voucherDiscount + shipPrice)}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant={"contained"}
                      onClick={handleNavigateToOrderForm}
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
                      <input
                        type={"text"}
                        placeholder='Mã ưu đãi'
                        value={voucherValue}
                        onChange={handleChangeVoucher}
                      ></input>
                      <Button onClick={handleVoucher} loading={voucherLoading}>
                        Apply
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            )}
          </div>
        </RequireAuth>
      </DefaultLayout>
    </div>
  )
}

export default Cart
