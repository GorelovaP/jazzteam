import thunkMiddleware from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./reducers";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleware),
});
//{serializableCheck: false}
// @ts-ignore
window.store = store;
