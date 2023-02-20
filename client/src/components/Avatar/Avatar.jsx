import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
function Avatar(userProfile) {
  const location = useLocation();
  console.log(location);
  return (
    <span>
      <img src={userProfile.image || ""}></img>
    </span>
  );
}

export default Avatar;
