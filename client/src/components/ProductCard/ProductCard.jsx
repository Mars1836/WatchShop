import React, { useState } from "react"
import styles from "./ProductCard.module.scss"
import FavoriteIcon from "@mui/icons-material/Favorite"
import classNames from "classnames/bind"
import { Link } from "react-router-dom"
import { actionCartApi } from "../../redux/actions/cart"
import { useDispatch } from "react-redux"
import useIsInWishList from "../../utils/hooks/isInWishList"
import { actionWishListApi } from "../../redux/actions/wishlist"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { CircularProgress } from "@mui/material"
import Button from "../Button/Button"
import handlePriceDiscount from "../../utils/function/handlePriceDiscount"
function ProductCard({ product }) {
  const cx = classNames.bind(styles)
  const dispatch = useDispatch()
  const isInWishList = useIsInWishList(product.id)
  const [addToCartLoading, setAddToCartLoading] = useState(false)
  const isAuth = useSelector(state => {
    return state.user.auth
  })
  const handleRequireAuth = () => {
    if (isAuth) {
      return false
    }
    toast.warning("Bạn cần đăng nhập trước!!!")
    return true
  }
  function handleAddToCart(productId) {
    setAddToCartLoading(true)
    const payload = { productId }
    dispatch(actionCartApi.addToCart(payload)).then(() => {
      setAddToCartLoading(false)
    })
  }
  function handleToggleWishlist() {
    dispatch(actionWishListApi.toggleWishList(product.id))
  }

  return (
    <div className={cx("product_card")} draggable={false}>
      <div className={cx("product_head")}>
        {!!Number(product.discount) && (
          <div className={cx("ribbon")}>
            <span className={cx("ribbon4")}>
              <span>Giảm {product.discount}%</span>
            </span>
          </div>
        )}
        <Link className={cx("product_name")} to={`/san-pham/${product.id}`}>
          <img src={product.img} alt='' draggable={false} />
        </Link>

        <button
          className={cx("like_btn", { active: isInWishList })}
          onClick={handleToggleWishlist}
        >
          <FavoriteIcon className={cx("icon")} />
        </button>
      </div>
      <div className={cx("product_infor")}>
        <Link className={cx("product_name")} to={`/san-pham/${product.id}`}>
          {product.name}
        </Link>
        <div className={cx("product_price")}>
          <div className={cx("price_wrapper")}>
            {!!product.discount && (
              <div className={cx("price", "origin_price")}>{product.price}</div>
            )}
            <div className={cx("price", "sale_price")}>
              {handlePriceDiscount(product)}
            </div>
          </div>
        </div>
        <Button
          style={{
            padding: "12px 10px",
            fontWeight: "500",
            width: "100%",
          }}
          variant='contained'
          onClick={() => {
            if (!handleRequireAuth()) {
              handleAddToCart(product.id)
            }
          }}
          loading={addToCartLoading}
        >
          Add to cart
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
