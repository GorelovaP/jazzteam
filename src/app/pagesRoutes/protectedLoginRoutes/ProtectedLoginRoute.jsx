import { Navigate, Outlet } from "react-router-dom";

import { PATH } from "../PagesRoutes";
import React from "react";
import { geIsLoggedInSelector } from "../../../redux/login/login-selectors";
import { useSelector } from "react-redux";

export const ProtectedLoginRoute = () => {
  const isLoggedIn = useSelector(geIsLoggedInSelector);

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};
