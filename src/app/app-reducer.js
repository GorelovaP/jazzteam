import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "app",
    initialState: {
        theme: "dark",
        error: null,
        isLoggedIn: false,
        loginUserName: ""
    },
    reducers: {
        setAppErrorAC(state, action ) {
            state.error = action.payload.error
        },
        setThemeAC(state, action ) {
            state.theme = action.payload.theme
        },
        setIsLoggedIn(state, action) {
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

