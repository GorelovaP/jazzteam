import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "app",
    initialState: {
        theme: "dark" as RequestThemeType,
        error: null as null | string,
        isLoggedIn: false,
        loginUserName: ""
    },
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setThemeAC(state, action: PayloadAction<{ theme: RequestThemeType }>) {
            state.theme = action.payload.theme
        },
        setIsLoggedIn(state, action: PayloadAction<{ userName: string, password: string }>) {
            if (action.payload.userName === "Admin" && action.payload.password === "12345678") {
                state.isLoggedIn = true
                state.loginUserName = action.payload.userName
            } else {
                alert("No")
            }
        }
    }
})
export const appReducer = slice.reducer
export const {setAppErrorAC, setThemeAC,setIsLoggedIn} = slice.actions


//types
export type RequestThemeType = 'dark' | 'light'