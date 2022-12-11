import "./mainPage.css";
import React from "react";
import { ThemeWrapper } from "../../common/components/themeWrapper/ThemeWrapper";

export const MainPage = () => {
  return (
    <ThemeWrapper>
      <div className="mainPage__Wrapper">
        <div className="mainPage__Wrapper__textBlock">
          Implementation of the test task as Polina sees it. It`&apos;s always
          nice to hear constructive criticism :)
        </div>
      </div>
    </ThemeWrapper>
  );
};
