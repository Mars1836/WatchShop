import React from "react";
import "./globalstyles.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import useAsyncData from "../../utils/hooks/asyncData";
import productRequest from "../../requests/product";
import { useSelector, useDispatch } from "react-redux";
import actionProductApi from "../../redux/actions/product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "rgb(200, 153, 121)",
    },
  },
});
function Globalstyles({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionProductApi.getAll());
  }, []);
  const isLoading = useSelector((state) => state.user.loading);
  return (
    <div className="global_styles">
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          limit={1}
        />
        <>{children}</>
      </ThemeProvider>
    </div>
  );
}
export default Globalstyles;
