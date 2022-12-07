import React from "react";
import "./themeWrapper.css"
import {useSelector} from "react-redux";


export const ThemeWrapper = ({children}) => {
    const theme = useSelector(state => state.profile.theme)

    return <div className={`themeWrapper ${theme === "dark" ? "themeWrapper_dark" : "themeWrapper_light"}`}>
        {children}
    </div>
}