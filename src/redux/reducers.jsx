import {combineReducers} from "redux";
import {appReducer} from "./app/app-reducer";
import {profileReducer} from "./profile/profile-reducer";
import {loginReducer} from "./login/login-reducer";
import {infoReducer} from "./info/info-reducer";
import {tableReducer} from "./table/table-reducer";
import {calendarReducer} from "./calendar/calendar-reducer";

export const rootReducer = combineReducers({
    app: appReducer,
    profile: profileReducer,
    login: loginReducer,
    info: infoReducer,
    table: tableReducer,
    calendar: calendarReducer
});
