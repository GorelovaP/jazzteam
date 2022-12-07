import React from "react";
import "./themeWrapper.css"
import {useSelector} from "react-redux";


export const ThemeWrapper = ({children}) => {
    const theme = useSelector(state => state.app.theme)

    return <div className={`${theme === "dark" ? "themeWrapper_dark" : "themeWrapper_light"}`}>
        {children}
    </div>
}