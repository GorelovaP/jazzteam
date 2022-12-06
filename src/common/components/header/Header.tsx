import {NavLink} from "react-router-dom";
import {useMatch} from "react-router-dom";
import {PATH} from "../../../app/pagesRoutes/PagesRoutes";
import "./header.css"

export const Header = () => {
    const match = useMatch('/:routeKey');

    return <div className="header">

        <div className="header__navigationBlock">
            <NavLink
                className={`header__navigationBlock__item ${match?.params.routeKey === undefined ? "header__navigationBlock__item_active" : undefined}`}
                to={PATH.MAIN}>Main Page</NavLink>
            <NavLink
                className={`header__navigationBlock__item ${match?.params.routeKey === "profile" ? "header__navigationBlock__item_active" : undefined}`}
                to={PATH.PROFILE}>Profile</NavLink>
            <NavLink
                className={`header__navigationBlock__item ${match?.params.routeKey === "info" ? "header__navigationBlock__item_active" : ''}`}
                to={PATH.INFO}>Info</NavLink>
            <NavLink
                className={`header__navigationBlock__item ${match?.params.routeKey === "calendar" ? "header__navigationBlock__item_active" : ''}`}
                to={PATH.CALENDAR}>Calendar</NavLink>
            <NavLink
                className={`header__navigationBlock__item ${match?.params.routeKey === "table" ? "header__navigationBlock__item_active" : ''}`}
                to={PATH.TABLE}>Table</NavLink>

            <div className="header__navigationBlock__circle"> </div>
        </div>
    </div>
}