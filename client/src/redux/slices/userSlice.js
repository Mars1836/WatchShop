import { createSlice } from "@reduxjs/toolkit";
import { actionUserApi } from "../actions/user";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
const cookies = new Cookies();
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: true,
    error: null,
    token: null,
    auth: false,
  },
  reducers: {
    finishLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actionUserApi.localLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actionUserApi.localLogin.fulfilled, (state, action) => {
      cookies.set("token", action.payload.token, { secure: true });
      window.location.reload();
    });
    builder.addCase(actionUserApi.localLogin.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
      toast.error("Sai username or password.");
    });
    builder.addCase(actionUserApi.verifyToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actionUserApi.verifyToken.fulfilled, (state, action) => {
      state.data = action.payload.user;
      state.token = action.payload.token;
      state.auth = true;
      state.loading = false;
    });
    builder.addCase(actionUserApi.verifyToken.rejected, (state) => {
      state.loading = false;
      state.auth = false;
    });
    builder.addCase(actionUserApi.logout.fulfilled, (state, action) => {
      state.data = null;
      state.auth = false;
      state.token = null;
      state.loading = false;
    });
    builder.addCase(actionUserApi.updateAddress.pending, (state) => {});
    builder.addCase(actionUserApi.updateAddress.fulfilled, (state, action) => {
      state.data.address = action.payload.data;
      toast.success("Thay đổi địa chỉ thành công.");
    });
    builder.addCase(actionUserApi.updateAddress.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(actionUserApi.updateProfile.pending, (state) => {});
    builder.addCase(actionUserApi.updateProfile.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.data = { ...state.data, ...action.payload.data };
      toast.success("Thay đổi địa chỉ thành công.");
    });
    builder.addCase(actionUserApi.updateProfile.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});
const userReducer = userSlice.reducer;
export const { finishLoading } = userSlice.actions;
export default userReducer;
