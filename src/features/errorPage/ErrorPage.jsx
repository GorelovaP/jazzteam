import "./errorPage.css";
import { PATH } from "../../app/pagesRoutes/PagesRoutes";
import React from "react";
import SuperButton from "../../common/components/supperButton/SupperButton";
import { ThemeWrapper } from "../../common/components/themeWrapper/ThemeWrapper";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
  let navigate = useNavigate();
  return (
    <ThemeWrapper>
      <div className={"errorPage__Wrapper"}>
        <div className="errorPage__Wrapper__errorCode">404</div>
        <h1>Page not found!</h1>
        <div className="errorPage__Wrapper__description">
          What you are looking for does not exist or is not open yet
        </div>
        <SuperButton onClick={() => navigate(PATH.MAIN)}>Main page</SuperButton>
      </div>
    </ThemeWrapper>
  );
};
