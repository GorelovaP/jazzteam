import {ThemeWrapper} from "../../common/components/themeWrapper/ThemeWrapper";
import "./profilePage.css";
import profilePhoto from "../../assets/profile/profilePhoto.png";
import {useDispatch, useSelector} from "react-redux";
import {BsSunFill} from "react-icons/bs";
import {setToLocalStorageThemeTC} from "../../redux/profile/profile-reducer";
import {
    getThemeSelector,
    getUserInformationSelector,
} from "../../redux/profile/profile-selectors";
import {useEffect} from "react";
import {isLocalStorageEmptySelector} from "../../redux/app/app-selectors";

export const ProfilePage = () => {
    const userInformation = useSelector(getUserInformationSelector);
    const theme = useSelector(getThemeSelector);
    const isLocalStorageEmpty = useSelector(isLocalStorageEmptySelector);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isLocalStorageEmpty) {
            dispatch(setToLocalStorageThemeTC({theme: "dark"}));
        }
    }, []);

    const changeTheme = () => {
        dispatch(
            setToLocalStorageThemeTC({theme: theme === "dark" ? "light" : "dark"})
        );
    };

    return (
        <ThemeWrapper>
            <div className="profilePageWrapper">
                <div className="profilePageWrapper__profile">
                    {theme === "dark" ? (
                        <BsSunFill
                            size={30}
                            style={{margin: "10px", color: "white", cursor: "pointer"}}
                            onClick={changeTheme}
                        />
                    ) : (
                        <BsSunFill
                            size={30}
                            style={{margin: "10px", color: "black", cursor: "pointer"}}
                            onClick={changeTheme}
                        />
                    )}
                    <img
                        src={profilePhoto}
                        alt="profilePhoto"
                        className="profilePageWrapper__profile__photo"
                    />
                    <div className="profilePageWrapper__profile__information">
                        <h2 className="profilePageWrapper__profile__information__header">
                            User Information
                        </h2>
                        <ul className="profilePageWrapper__profile__information__items">
                            {Object.entries(userInformation).map(([key, value]) => (
                                <li
                                    key={key}
                                    className="profilePageWrapper__profile__information__items__item"
                                >
                                    <span className="profileItem__key">{key} : </span>
                                    <span className="profileItem__value">{value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </ThemeWrapper>
    );
};
