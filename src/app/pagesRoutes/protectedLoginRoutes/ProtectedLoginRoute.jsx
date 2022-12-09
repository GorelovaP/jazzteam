import { Navigate, Outlet } from "react-router-dom";

import { PATH } from "../PagesRoutes";
import { useSelector } from "react-redux";
import { geIsLoggedInSelector } from "../../../redux/login/login-selectors";

export const ProtectedLoginRoute = () => {
  const isLoggedIn = useSelector(geIsLoggedInSelector);

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};
