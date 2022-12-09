import React from "react";
import "./themeWrapper.css";
import { useSelector } from "react-redux";
import { getThemeSelector } from "../../../redux/profile/profile-selectors";

export const ThemeWrapper = ({ children }) => {
  const theme = useSelector(getThemeSelector);

  return (
    <div
      className={`themeWrapper ${
        theme === "dark" ? "themeWrapper_dark" : "themeWrapper_light"
      }`}
    >
      {children}
    </div>
  );
};
