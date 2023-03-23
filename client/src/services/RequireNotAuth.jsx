import React from "react";

import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
function RequireNotAuth({ children }) {
  const isAuth = useSelector((state) => state.user.auth);

  return (
    <div>{!isAuth ? <div>{children}</div> : <Navigate to="/"></Navigate>}</div>
  );
}

export default RequireNotAuth;
