import { ThemeWrapper } from "../../common/components/themeWrapper/ThemeWrapper";
import "./loginPage.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { SupperInput } from "../../common/components/supperInput/SupperInput";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import SuperButton from "../../common/components/supperButton/SupperButton";
import { Navigate } from "react-router-dom";
import { PATH } from "../../app/pagesRoutes/PagesRoutes";
import { useDispatch, useSelector } from "react-redux";
import { LoginTC } from "../../redux/login/login-reducer";
import {
  geIsLoggedInSelector,
  getLoginErrorSelector,
} from "../../redux/login/login-selectors";

export const LoginPage = () => {
  let dispatch = useDispatch();
  const isLoggedIn = useSelector(geIsLoggedInSelector);
  const loginError = useSelector(getLoginErrorSelector);

  const formik = useFormik({
    validationSchema: Yup.object({
      userName: Yup.string().required("* User name field is required"),
      password: Yup.string().min(8).required("* Password field is required"),
    }),
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(LoginTC(values));
      //formik.resetForm()
    },
  });

  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />;
  }
  return (
    <ThemeWrapper>
      <div className="loginPage__Wrapper">
        <form
          onSubmit={formik.handleSubmit}
          className="loginPage__Wrapper__LoginForm"
        >
          <h2>User Login</h2>
          <div className="loginPage__Wrapper__LoginForm__input">
            <FaUserCircle
              style={{
                color: "darkgray",
                fontSize: "1.5em",
                position: "absolute",
                top: "30px",
                left: "5px",
              }}
            />
            <SupperInput
              type="text"
              placeholder="User name"
              error={!!(formik.errors.userName && formik.touched.userName)}
              {...formik.getFieldProps("userName")}
            />

            {formik.errors.userName && formik.touched.userName ? (
              <div className="loginPage__Wrapper__LoginForm__input__error">
                {formik.errors.userName}
              </div>
            ) : null}
          </div>
          <div className="loginPage__Wrapper__LoginForm__input">
            <RiLockPasswordFill
              style={{
                color: "darkgray",
                fontSize: "1.5em",
                position: "absolute",
                top: "30px",
                left: "5px",
              }}
            />
            <SupperInput
              type="password"
              placeholder="password"
              error={!!(formik.errors.password && formik.touched.password)}
              {...formik.getFieldProps("password")}
            />

            {formik.errors.password && formik.touched.password ? (
              <div className="loginPage__Wrapper__LoginForm__input__error">
                {" "}
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="loginPage__Wrapper__LoginForm__button">
            <SuperButton
              type="submit"
              red={!!(formik.errors.password || formik.errors.userName)}
            >
              {" "}
              Login{" "}
            </SuperButton>
          </div>
          {loginError && (
            <div className="loginPage__Wrapper__LoginForm__errorArea">
              {loginError}
            </div>
          )}
        </form>
      </div>
    </ThemeWrapper>
  );
};
