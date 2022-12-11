import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { Header } from "../common/components/header/Header";
import { PagesRoutes } from "./pagesRoutes/PagesRoutes";
import React, { useEffect } from "react";
import { SnackBarError } from "../common/components/snackBarError/SnackBarError";
import { getErrorSelector } from "../redux/app/app-selectors";
import { getFromLocalStorageTC } from "../redux/app/app-reducer";

function App() {
  const dispatch = useDispatch();
  const appError = useSelector(getErrorSelector);

  useEffect(() => {
    dispatch(getFromLocalStorageTC());
  }, []);

  return (
    <div>
      <Header />
      <PagesRoutes />
      {appError && <SnackBarError />}
    </div>
  );
}

export default App;
