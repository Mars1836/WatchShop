import React from "react";
import Header from "../../components/Header/Header";
import "./home.scss";
import { Grid, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function Home() {
  const theme = useTheme();
  const sm_matches = useMediaQuery(theme.breakpoints.up("sm"));
  const md_matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <div className="home">
      <Header></Header>
    </div>
  );
}

export default Home;
