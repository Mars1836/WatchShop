import { createSlice } from "@reduxjs/toolkit"
import { actionCartApi } from "../actions/cart.js"
import { toast } from "react-toastify"

import Cookies from "universal-cookie"
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    orderSuccess: (state, action) => {
      state.data.cart_items = []
    },
  },
  extraReducers: builder => {
    builder.addCase(actionCartApi.getCart.pending, state => {
      state.loading = true
    })
    builder.addCase(actionCartApi.getCart.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
    })
    builder.addCase(actionCartApi.getCart.rejected, (state, action) => {
      state.error = action.error
      state.loading = false
    })
    //
    builder.addCase(actionCartApi.removeFromCart.pending, state => {
      state.loading = true
    })
    builder.addCase(actionCartApi.removeFromCart.fulfilled, (state, action) => {
      state.loading = false
      state.data.cart_items = state.data.cart_items.filter(item => {
        return item.id !== action.payload
      })
      toast.success("Dã xóa sản phẩm khỏi giỏ hàng.")
    })
    builder.addCase(actionCartApi.removeFromCart.rejected, (state, action) => {
      state.loading = false
      state.error = action.error
    })
    //+
    builder.addCase(actionCartApi.addToCart.pending, state => {
      state.loading = true
    })
    builder.addCase(actionCartApi.addToCart.fulfilled, (state, action) => {
      state.loading = false
      if (action.payload.message === "create_record") {
        state.data.cart_items.push(action.payload.cartItem)
      }
      if (action.payload.message === "update_record") {
        const index = state.data.cart_items.findIndex(item => {
          return item.id === action.payload.cartItem.id
        })
        state.data.cart_items[index] = action.payload.cartItem
      }
      toast.success("Đã thêm sản phẩm vào giỏ hàng!")
    })
    builder.addCase(actionCartApi.addToCart.rejected, (state, action) => {
      state.error = action.error
      state.loading = false
    })
    //
    builder.addCase(actionCartApi.updateQuantityInCart.pending, state => {
      state.loading = true
    })
    builder.addCase(
      actionCartApi.updateQuantityInCart.fulfilled,
      (state, action) => {
        state.data.cart_items = state.data.cart_items.map((item, index) => {
          return {
            ...item,
            ...action.payload[index],
          }
        })
        state.loading = false
        toast.success("Cập nhật giỏ hàng thành công.")
      },
    )
    builder.addCase(
      actionCartApi.updateQuantityInCart.rejected,
      (state, action) => {
        state.loading = false
      },
    )
  },
})
const CartReducer = CartSlice.reducer
export const { orderSuccess } = CartSlice.actions
export default CartReducer
