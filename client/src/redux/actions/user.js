import { orderEndpoint, userEndpoint } from "../../utils/configs/api"
import instance from "../../utils/configs/instance"
import { createAsyncThunk } from "@reduxjs/toolkit"

const actionUser = {
  orderSuccess: () => {
    return {}
  },
}
const actionUserApi = {
  register: createAsyncThunk(
    "user/register",
    async (data, { rejectWithValue }) => {
      try {
        const res = await instance.post(userEndpoint.register, data)
        return res.data
      } catch ({ response }) {
        return rejectWithValue(response.data)
      }
    },
  ),
  localLogin: createAsyncThunk(
    "user/localLogin",
    async ({ username, password }) => {
      const response = await instance.post(userEndpoint.localLogin, {
        username,
        password,
      })
      return response.data
    },
  ),
  googleLogin: createAsyncThunk("user/googleLogin", async token => {
    const response = await instance.post(userEndpoint.googleLogin, token)
    return response.data
  }),
  verifyToken: createAsyncThunk("user/verifyToken", async token => {
    const user = await instance.post(userEndpoint.verifyToken, {
      token: token,
    })

    return user.data
  }),
  logout: createAsyncThunk("user/logout", async () => {
    let res = await instance.post(userEndpoint.logout)
    return res.data
  }),
  updateAddress: createAsyncThunk("user/updateAddress", async address => {
    const data = await instance.patch(userEndpoint.updateAddress, address)
    return data.data
  }),
  updateProfile: createAsyncThunk("user/updateProfile", async data => {
    const update = await instance.patch(userEndpoint.updateProfile, data)
    return update.data
  }),
  placeOrder: createAsyncThunk("user/placeOrder", async data => {
    const t = await instance.post(orderEndpoint.placeOrder, data)
    return t.data
  }),
}
export { actionUser, actionUserApi }
