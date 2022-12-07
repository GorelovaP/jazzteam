import {combineReducers} from "redux";
import {appReducer} from "./app-reducer";
import {profileReducer} from "./profile-reducer";
import {loginReducer} from "./login-reducer";
import {infoReducer} from "./info-reducer";

export const rootReducer = combineReducers({
    app: appReducer,
    profile: profileReducer,
    login: loginReducer,
    info: infoReducer,
})
