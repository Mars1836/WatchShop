import React, { useEffect } from "react"
import { actionUserApi } from "../redux/actions/user"
import { useDispatch } from "react-redux"
import { useCookies } from "react-cookie"
import { useSelector } from "react-redux"
import { finishLoading } from "../redux/slices/userSlice"
import { actionCartApi } from "../redux/actions/cart"
import { actionWishListApi } from "../redux/actions/wishlist"
function VerifyToken({ children }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (1) {
      dispatch(actionUserApi.verifyToken("1"))
      dispatch(actionCartApi.getCart())
      dispatch(actionWishListApi.getWishList())
    } else {
      dispatch(finishLoading())
    }
  }, [])
  return <>{children}</>
}

export default VerifyToken
