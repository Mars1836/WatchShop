import { createAsyncThunk } from "@reduxjs/toolkit";
import { productEndpoint } from "../../utils/configs/api";
import instance from "../../utils/configs/instance";
function convertDecimalString(data) {
  if (typeof data?.length !== "number") {
    return (data.discount = Number(data.discount));
  }
  return data.map((x) => {
    return {
      ...x,
      categories: x.categories.map((ca) => ca.value),
      tags: x.tags.map((ca) => ca.value),
      discount: Number(x.discount),
    };
  });
}
const actionProductApi = {
  getAll: createAsyncThunk("product/getAll", async () => {
    const response = await instance.get(productEndpoint.getAll); // products data
    return convertDecimalString(response.data);
  }),
};
export default actionProductApi;
