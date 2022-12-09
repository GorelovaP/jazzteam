import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setLoginUserInformationAC, setThemeToStateAC} from "./profile-reducer";
import {setIsLoggedIn} from "./login-reducer";


export const getFromLocalStorageTC = createAsyncThunk("app/getFromLocalStorage", (param, {dispatch}) => {
        const userInformation = localStorage.getItem("UserInformation");
        const userThemeFromLocal = localStorage.getItem("Theme");
        if (userInformation) {
            let newLoggedUserInformation = JSON.parse(userInformation)
            let userTheme = JSON.parse(userThemeFromLocal)
            dispatch(setLoginUserInformationAC(newLoggedUserInformation))
            dispatch(setThemeToStateAC({theme: userTheme}))
            dispatch(setIsLoggedIn({isLoggedIn: true}))
        }
    }
)

export const setToLocalStorageTC = createAsyncThunk("app/setToLocalStorage", ({userInformation}) => {
        localStorage.setItem("UserInformation", JSON.stringify(userInformation));
    }
)

export const deleteFromLocalStorageTC = createAsyncThunk("app/deleteFromLocalStorage", (param, {dispatch}) => {
        localStorage.removeItem("UserInformation");
        localStorage.removeItem("Theme");
    }
)


const slice = createSlice({
        name: "app",
        initialState: {
            error: null,
            isLoading: false
        },
        reducers: {
            setAppErrorAC(state, action) {
                state.error = action.payload.error
            },
            setIsLoadingAC(state, action) {
                state.isLoading = action.payload.isLoading
            },
        }
    }
)

export const appReducer = slice.reducer
export const {setAppErrorAC, setIsLoadingAC} = slice.actions

