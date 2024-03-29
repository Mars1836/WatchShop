import { createSlice } from "@reduxjs/toolkit"
import { actionUserApi } from "../actions/user"
import Cookies from "universal-cookie"
import { toast } from "react-toastify"
const cookies = new Cookies()
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: true,
    error: null,
    token: null,
    auth: false,
    verifyLoading: true,
    userLoginLoading: false,
    userSignupLoading: false,
  },
  reducers: {
    finishLoading: state => {
      state.loading = false
    },
  },
  extraReducers: builder => {
    builder.addCase(actionUserApi.register.pending, state => {})
    builder.addCase(actionUserApi.register.fulfilled, state => {
      toast.success("Đăng kí thành công")
    })
    builder.addCase(actionUserApi.register.rejected, (state, action) => {
      toast.error(action.payload.error)
    })
    builder.addCase(actionUserApi.localLogin.pending, state => {
      state.loading = true
      state.userLoginLoading = true
    })
    builder.addCase(actionUserApi.localLogin.fulfilled, (state, action) => {
      state.userLoginLoading = false
      window.location.reload()
    })
    builder.addCase(actionUserApi.localLogin.rejected, (state, action) => {
      state.error = action.error
      state.loading = false
      toast.error("Wrong username or password.")
      state.userLoginLoading = false
    })
    builder.addCase(actionUserApi.verifyToken.pending, state => {
      state.verifyLoading = true
    })
    builder.addCase(actionUserApi.verifyToken.fulfilled, (state, action) => {
      state.data = action.payload.user
      state.token = action.payload.token
      state.auth = true
      state.verifyLoading = false
      console.log("success", action.payload)
    })
    builder.addCase(actionUserApi.verifyToken.rejected, state => {
      console.log("fail")
      state.verifyLoading = false
      state.auth = false
    })
    builder.addCase(actionUserApi.logout.fulfilled, (state, action) => {
      state.data = null
      state.auth = false
      state.token = null
      state.loading = false
    })
    builder.addCase(actionUserApi.logout.pending, (state, action) => {
      console.log("pendding")
    })
    builder.addCase(actionUserApi.logout.rejected, (state, action) => {
      console.log("reject")
    })
    builder.addCase(actionUserApi.updateAddress.pending, state => {})
    builder.addCase(actionUserApi.updateAddress.fulfilled, (state, action) => {
      state.data.address = action.payload.data
      toast.success("Thay đổi địa chỉ thành công.")
    })
    builder.addCase(actionUserApi.updateAddress.rejected, (state, action) => {
      state.error = action.error
    })
    builder.addCase(actionUserApi.updateProfile.pending, state => {})
    builder.addCase(actionUserApi.updateProfile.fulfilled, (state, action) => {
      console.log(action.payload.data)
      state.data = { ...state.data, ...action.payload.data }
      toast.success("Thay đổi địa chỉ thành công.")
    })
    builder.addCase(actionUserApi.updateProfile.rejected, (state, action) => {
      state.error = action.error
    })
    builder.addCase(actionUserApi.createOrder.pending, state => {})
    builder.addCase(actionUserApi.createOrder.fulfilled, (state, action) => {
      toast.success("Order success!!")
      state.user.data.carts = []
    })
    builder.addCase(actionUserApi.createOrder.rejected, (state, action) => {})
  },
})
const userReducer = userSlice.reducer
export const { finishLoading } = userSlice.actions
export default userReducer
