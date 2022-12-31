import React from "react";
import "./globalstyles.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "rgb(200, 153, 121)",
    },
  },
});
function Globalstyles({ children }) {
  return (
    <div className="global_styles">
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </div>
  );
}
export default Globalstyles;
