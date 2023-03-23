import React, { useEffect } from "react"
import DefaultLayout from "../../layout/DefaultLayout"
import classNames from "classnames/bind"
import styles from "./orderform.module.scss"
import { Button, Grid } from "@mui/material"
import RequireAuth from "../../services/RequireAuth/RequireAuth"
import { useForm } from "react-hook-form"
import { useState } from "react"
import useArea from "../../utils/hooks/area"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useSelector, useDispatch } from "react-redux"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import orderRequest from "../../requests/order"
import { toast } from "react-toastify"
import cartRequest from "../../requests/cart"
import { useNavigate } from "react-router-dom"
import routes from "../../utils/configs/routes"
import CircularProgress from "@mui/material/CircularProgress"
import { orderSuccess } from "../../redux/slices/cartSlice"
import Modal from "../../components/Modal/Modal"
import { useLocation } from "react-router-dom"
function indexOfCity(name, area) {
  if (!name) return -1
  return area.findIndex(item => {
    return item.Name === name
  })
}
function indexOfDistrict(nameCity, nameDistrict, area) {
  if (!nameCity | !nameDistrict) {
    return -1
  }
  const indexCity = indexOfCity(nameCity, area)
  return area[indexCity]?.Districts.findIndex(item => {
    return item.Name === nameDistrict
  })
}
function indexOfWards(nameCity, nameDistrict, nameWard, area) {
  if (!nameCity | !nameDistrict | !nameWard) {
    return -1
  }
  const indexCity = indexOfCity(nameCity, area)
  const indexDistrict = indexOfDistrict(nameCity, nameDistrict, area)
  return area[indexCity]?.Districts[indexDistrict].Wards.findIndex(item => {
    return item.Name === nameWard
  })
}
const schema = yup
  .object({
    name: yup.string().required(),
    city: yup.string().required(),
    district: yup.string().required(),
    ward: yup.string().required(),
    location: yup.string().required(),
    phone: yup.string().required(),
    note: yup.string(),
  })
  .required()
const cx = classNames.bind(styles)
function OrderForm() {
  const area = useArea()
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [shipPrice, setShipPrice] = useState(0)
  const [voucherDiscount, setVoucherDiscount] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector(state => state.user.data)
  const [loadingValueForm, setLoadingValueForm] = useState(false)
  const indexCity = indexOfCity(user?.address.city, area)
  const [init, setInit] = useState(false)
  const dispatch = useDispatch()
  const indexDistrict = indexOfDistrict(
    user?.address.city,
    user?.address.district,
    area,
  )
  const indexWard = indexOfWards(
    user?.address.city,
    user?.address.district,
    user?.address.ward,
    area,
  )
  const {
    register,
    handleSubmit,
    resetField,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const cart = useSelector(state => {
    return state.cart.data
  })

  function handleGetDistricts(cityIndex) {
    console.log(cityIndex)
    setDistricts(area[cityIndex]?.Districts)
  }
  function handleGetWards(cityIndex, districtIndex) {
    setWards(area[cityIndex]?.Districts[districtIndex]?.Wards)
  }
  function onSubmit(d) {
    const data = {
      ...d,
      totalPrice: totalPrice + shipPrice - voucherDiscount,
      address: {
        city: area[d.city].Name,
        district: area[d.city].Districts[d.district].Name,
        ward: area[d.city].Districts[d.district].Wards[d.ward].Name,
        location: d.location,
      },
      orderItems: cart.cart_items.map(item => {
        return {
          quantity: item.quantity,
          productId: item.productId,
          price: item.product.price,
        }
      }),
    }
    orderRequest
      .placeOrder(data)
      .then(() => {
        cartRequest.resetCart()
        dispatch(orderSuccess())
        navigate(routes.order_success.path)
        toast.success("Đặt hàng thành công")
      })
      .catch(error => {
        toast.error("error")
      })
  }
  useEffect(() => {
    setTotalPrice(location.state.totalPrice)
    setShipPrice(location.state.shipPrice)
    setVoucherDiscount(location.state.voucherDiscount)
  }, [location])
  useEffect(() => {
    console.log(init)
    if (init | !user) {
      return
    }
    if (!districts[indexDistrict] | !wards[indexWard]) {
      return
    }
    setValue("district", indexDistrict)
    setValue("ward", indexWard)
    setInit(true)
  }, [districts, wards])

  useEffect(() => {
    if (!(area.length > 0) | !user) {
      return
    }
    setValue("name", user?.name)
    setValue("phone", user?.phone)
    if (!user.address.city) {
      return
    }
    setValue("city", indexCity)
    handleGetDistricts(indexCity)
    handleGetWards(indexCity, 6)
    setValue("location", user?.address.location)
  }, [user, area])
  return (
    <div className={cx("order_form")}>
      <DefaultLayout>
        <RequireAuth>
          <div className={cx("wrapper")}>
            <form
              className={cx("form")}
              onSubmit={handleSubmit(onSubmit)}
              tabIndex='-1'
            >
              <Grid container justifyContent={"center"} spacing={4}>
                <Grid item xs={12} sm={8} md={6} className={cx("item")}>
                  <p className={cx("title")}>Chi tiết đơn hàng</p>

                  <div className={cx("form_group")}>
                    <div className={cx("input_group")}>
                      <label htmlFor='name' className={cx("label")}>
                        Họ tên
                      </label>
                      <input
                        id='name'
                        {...register("name")}
                        className={cx("input")}
                      ></input>
                      {errors.name && (
                        <div className={cx("error")}>
                          <ErrorOutlineIcon
                            className={cx("icon")}
                          ></ErrorOutlineIcon>
                          <p className={cx("error_text")}>
                            {errors.name.message}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={cx("input_group")}>
                      <label htmlFor='city' className={cx("label")}>
                        Tỉnh thành
                      </label>
                      <select
                        id='city'
                        className={cx("input")}
                        {...register("city")}
                        onChange={e => {
                          resetField("district")
                          resetField("ward")
                          handleGetDistricts(e.target.value)
                        }}
                      >
                        <option value=''>Chọn tỉnh thành</option>
                        {area &&
                          area.map((item, index) => {
                            return (
                              <option value={index} key={item.Id}>
                                {item.Name}
                              </option>
                            )
                          })}
                      </select>
                      {errors.city && (
                        <div className={cx("error")}>
                          <ErrorOutlineIcon
                            className={cx("icon")}
                          ></ErrorOutlineIcon>
                          <p className={cx("error_text")}>
                            {errors.city.message}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={cx("input_group")}>
                      <label htmlFor='districts' className={cx("label")}>
                        Quận huyện
                      </label>
                      <select
                        id='districts'
                        className={cx("input")}
                        {...register("district")}
                        onChange={e => {
                          resetField("ward")
                          handleGetWards(getValues("city"), e.target.value)
                        }}
                      >
                        <option value=''>Chọn quận huyện</option>
                        {area &&
                          districts.map((item, index) => {
                            return (
                              <option value={index} key={item.Id}>
                                {item.Name}
                              </option>
                            )
                          })}
                      </select>
                      {errors.district && (
                        <div className={cx("error")}>
                          <ErrorOutlineIcon
                            className={cx("icon")}
                          ></ErrorOutlineIcon>
                          <p className={cx("error_text")}>
                            {errors.district.message}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={cx("input_group")}>
                      <label htmlFor='ward' className={cx("label")}>
                        Thị xã
                      </label>
                      <select
                        id='ward'
                        {...register("ward")}
                        className={cx("input")}
                      >
                        <option value=''>Chọn thị xã</option>
                        {area &&
                          wards.map((item, index) => {
                            return (
                              <option value={index} key={item.Id}>
                                {item.Name}
                              </option>
                            )
                          })}
                      </select>
                      {errors.ward && (
                        <div className={cx("error")}>
                          <ErrorOutlineIcon
                            className={cx("icon")}
                          ></ErrorOutlineIcon>
                          <p className={cx("error_text")}>
                            {errors.ward.message}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={cx("input_group")}>
                      <label htmlFor='location' className={cx("label")}>
                        Địa chỉ cụ thể
                      </label>
                      <input
                        id='location'
                        {...register("location")}
                        className={cx("input")}
                      ></input>
                      {errors.location && (
                        <div className={cx("error")}>
                          <ErrorOutlineIcon
                            className={cx("icon")}
                          ></ErrorOutlineIcon>
                          <p className={cx("error_text")}>
                            {errors.location.message}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={cx("input_group")}>
                      <label htmlFor='phone' className={cx("label")}>
                        Điện thoại
                      </label>
                      <input
                        id='phone'
                        {...register("phone")}
                        className={cx("input")}
                      ></input>
                      {errors.phone && (
                        <div className={cx("error")}>
                          <ErrorOutlineIcon
                            className={cx("icon")}
                          ></ErrorOutlineIcon>
                          <p className={cx("error_text")}>
                            {errors.phone.message}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={cx("input_group")}>
                      <label htmlFor='node' className={cx("label")}>
                        Ghi chú
                      </label>
                      <input
                        id='note'
                        {...register("note")}
                        className={cx("input")}
                      ></input>
                      {errors.note && (
                        <div className={cx("error")}>
                          <ErrorOutlineIcon
                            className={cx("icon")}
                          ></ErrorOutlineIcon>
                          <p className={cx("error_text")}>
                            {errors.note.message}
                          </p>
                        </div>
                      )}
                    </div>
                    {loadingValueForm && (
                      <div className={cx("loading")}>
                        <CircularProgress
                          style={{ color: "#B1B1B1" }}
                        ></CircularProgress>
                      </div>
                    )}
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={6}
                  className={cx("right", "item")}
                >
                  <p className={cx("title")}>Chi tiết đơn hàng</p>
                  <div className={cx("container")}>
                    <ul className={cx("list")}>
                      <li className={cx("item")}>
                        <span className={cx("col")}>PRODUCT</span>
                        <span className={cx("col")}>TOTAL</span>
                      </li>
                      {cart &&
                        cart.cart_items.map(item => {
                          return (
                            <li className={cx("item")} key={item.id}>
                              <span className={cx("col")}>
                                {item.product.name + "\n"}
                                <strong>x{item.quantity}</strong>
                              </span>
                              <span className={cx("col", "price")}>
                                {item.quantity * item.product.price}
                              </span>
                            </li>
                          )
                        })}
                      <li className={cx("item")}>
                        <span className={cx("col")}>Vận chuyển</span>
                        <span className={cx("col", "price")}>{shipPrice}</span>
                      </li>
                      <li className={cx("item")}>
                        <span className={cx("col")}>Voucher</span>
                        <span
                          className={cx("col", "price")}
                          style={voucherDiscount ? { color: "crimson" } : {}}
                        >
                          {voucherDiscount ? (
                            <>{"- " + voucherDiscount}</>
                          ) : (
                            <>{voucherDiscount}</>
                          )}
                        </span>
                      </li>
                      <li className={cx("item")}>
                        <span className={cx("col")}>Tổng</span>
                        <span className={cx("col", "price")}>
                          <strong>
                            {totalPrice + shipPrice - voucherDiscount}
                          </strong>
                        </span>
                      </li>
                    </ul>
                    <div className={cx("extend")}>
                      <strong>Direct Bank Transfer</strong>
                      <p>
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        won’t be shipped until the funds have cleared in our
                        account.
                      </p>
                      <strong>Cheque Payment</strong>
                      <p>
                        Please send your cheque to Store Name, Store Street,
                        Store Town, Store State / County, Store Postcode.
                      </p>
                      <strong>PayPal</strong>
                      <p>
                        Pay via PayPal; you can pay with your credit card if you
                        don’t have a PayPal account.
                      </p>
                    </div>
                    <Button
                      variant='contained'
                      style={{
                        color: "white",
                        border: "0px",
                      }}
                      type='submit'
                    >
                      Place order
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </div>
          /
        </RequireAuth>
      </DefaultLayout>
    </div>
  )
}

export default OrderForm
