import { appReducer } from "./app/app-reducer";
import { calendarReducer } from "./calendar/calendar-reducer";
import { combineReducers } from "redux";
import { infoReducer } from "./info/info-reducer";
import { loginReducer } from "./login/login-reducer";
import { profileReducer } from "./profile/profile-reducer";
import { tableReducer } from "./table/table-reducer";

export const rootReducer = combineReducers({
  app: appReducer,
  profile: profileReducer,
  login: loginReducer,
  info: infoReducer,
  table: tableReducer,
  calendar: calendarReducer,
});
