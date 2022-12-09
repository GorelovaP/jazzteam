import SuperButton from "../../common/components/supperButton/SupperButton";
import { PATH } from "../../app/pagesRoutes/PagesRoutes";
import { useNavigate } from "react-router-dom";
import "./errorPage.css";
import { ThemeWrapper } from "../../common/components/themeWrapper/ThemeWrapper";

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
