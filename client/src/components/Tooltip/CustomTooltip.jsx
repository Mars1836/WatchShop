import React from "react";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import "react-tooltip/dist/react-tooltip.css";

function CustomTooltip(props) {
  return <Tooltip {...props}></Tooltip>;
}
export default CustomTooltip;
