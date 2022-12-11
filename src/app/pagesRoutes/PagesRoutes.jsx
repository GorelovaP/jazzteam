import { Navigate, Route, Routes } from "react-router-dom";
import { CalendarPage } from "../../features/calendarPage/СalendarPage";
import { ErrorPage } from "../../features/errorPage/ErrorPage";
import { InfoPage } from "../../features/infoPage/InfoPage";
import { LoginPage } from "../../features/loginPage/LoginPage";
import { MainPage } from "../../features/mainPage/MainPage";
import { ProfilePage } from "../../features/profilePage/ProfilePage";
import { ProtectedLoginRoute } from "./protectedLoginRoutes/ProtectedLoginRoute";
import React from "react";
import { TablePage } from "../../features/tablePage/TablePage";

export const PATH = {
  MAIN: "/",
  LOGIN: "/login",
  PROFILE: "/profile",
  INFO: "/info",
  CALENDAR: "/calendar",
  TABLE: "/table",
  PAGE_404: "/404",
};

export const PagesRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={PATH.LOGIN} element={<LoginPage />} />
        <Route element={<ProtectedLoginRoute />}>
          <Route path={PATH.PROFILE} element={<ProfilePage />} />
          <Route path={PATH.CALENDAR} element={<CalendarPage />} />
          <Route path={PATH.TABLE} element={<TablePage />} />
          <Route path={PATH.INFO} element={<InfoPage />} />
        </Route>
        <Route path={PATH.PAGE_404} element={<ErrorPage />} />
        <Route path={"/*"} element={<Navigate to={PATH.PAGE_404} />} />
      </Routes>
    </>
  );
};
