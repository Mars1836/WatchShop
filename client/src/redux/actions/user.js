import {
  orderEndpoint,
  userEndpoint,
  userProfileEndpoint,
} from "../../utils/configs/api"
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
    const user = await instance.post(userEndpoint.verifyToken)
    return user.data
  }),
  logout: createAsyncThunk("user/logout", async () => {
    let res = await instance.post(userEndpoint.logout)
    return res.data
  }),
  updateAddress: createAsyncThunk("user/updateAddress", async address => {
    const data = await instance.patch(
      userProfileEndpoint.updateAddress,
      address,
    )
    return data.data
  }),
  updateProfile: createAsyncThunk("user/updateProfile", async data => {
    const update = await instance.patch(userProfileEndpoint.updateProfile, data)
    return update.data
  }),
  createOrder: createAsyncThunk("user/createOrder", async data => {
    const t = await instance.post(orderEndpoint.createOrder, data)
    return t.data
  }),
}
export { actionUser, actionUserApi }
