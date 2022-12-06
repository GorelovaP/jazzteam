import React from "react";
import {useAppSelector} from "../../hooks/appHooks";
import "./themeWrapper.css"

type ThemeWrapperPropsType = {
    children: React.ReactNode,
}

export const ThemeWrapper = (props: ThemeWrapperPropsType) => {
    const theme = useAppSelector(state => state.app.theme)

    return <div className={`${theme === "dark" ? "themeWrapper_dark" : "themeWrapper_light"}`}>
        {props.children}
    </div>
}