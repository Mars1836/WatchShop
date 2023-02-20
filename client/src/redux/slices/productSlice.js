import { createSlice } from "@reduxjs/toolkit";
import actionProductApi from "../actions/product";
const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actionProductApi.getAll.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(actionProductApi.getAll.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(actionProductApi.getAll.rejected, (state, action) => {
      state.data = action.error;
      state.loading = false;
    });
  },
});
const productReducer = productSlice.reducer;
export default productReducer;
