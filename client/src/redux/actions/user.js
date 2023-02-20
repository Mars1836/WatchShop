import { userEndpoint } from "../../utils/configs/api";
import instance from "../../utils/configs/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useCookies } from "react-cookie";

const actionUser = {
  localLoginSuccess: (state, action) => {
    state.data = action.payload.user;
    state.token = action.payload.token;
  },
};
const actionUserApi = {
  localLogin: createAsyncThunk(
    "user/localLogin",
    async ({ username, password }) => {
      const response = await instance.post(userEndpoint.localLogin, {
        username,
        password,
      });
      return response.data;
    }
  ),
  verifyToken: createAsyncThunk("user/verifyToken", async (token) => {
    const user = await instance.post(userEndpoint.verifyToken, {
      token: token,
    });
    return user.data;
  }),
  logout: createAsyncThunk("user/logout", async () => {
    await instance.post(userEndpoint.logout);
  }),
  updateAddress: createAsyncThunk("user/updateAddress", async (address) => {
    const data = await instance.patch(userEndpoint.updateAddress, address);
    return data.data;
  }),
  updateProfile: createAsyncThunk("user/updateProfile", async (data) => {
    const update = await instance.patch(userEndpoint.updateProfile, data);
    return update.data;
  }),
};
export { actionUser, actionUserApi };
