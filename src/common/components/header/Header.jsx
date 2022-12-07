import {NavLink} from "react-router-dom";
import {useMatch} from "react-router-dom";
import {PATH} from "../../../app/pagesRoutes/PagesRoutes";
import "./header.css"
import {useDispatch, useSelector} from "react-redux";
import {IoExitSharp} from "react-icons/io5";
import {LogoutTC} from "../../../redux/login-reducer";

export const Header = () => {
    const match = useMatch('/:routeKey');
    const dispatch = useDispatch()
    const userName = useSelector(state => state.profile.userInformation.LoginUserName)

    const logOut = () => {
        dispatch(LogoutTC())
    }

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
        {userName &&
        <div className="header__userName">
            {userName}
            <IoExitSharp size={30} style={{margin: "10px", color: "white", cursor: "pointer"}} onClick={logOut}/>
        </div>}
    </div>
}