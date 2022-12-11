import "./themeWrapper.css";

import React from "react";
import { getThemeSelector } from "../../../redux/profile/profile-selectors";
import { useSelector } from "react-redux";

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
