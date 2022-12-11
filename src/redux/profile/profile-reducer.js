import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const setToLocalStorageThemeTC = createAsyncThunk(
    "profile/setToLocalStorageTheme",
    ({theme}) => {
        localStorage.setItem("Theme", JSON.stringify(theme));
        return {theme: theme};
    }
);

const slice = createSlice({
    name: "profile",
    initialState: {
        theme: "dark",
        userInformation: {
            LoginUserName: "",
            Age: "",
            Nationality: "",
            Address: "",
            Freelance: "",
            Phone: "",
            EnglishLevel: "",
        }
    },
    reducers: {
        setLoginUserInformationAC(state, action) {
            state.userInformation = action.payload;
        },
        setThemeToStateAC(state, action) {
            state.theme = action.payload.theme;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setToLocalStorageThemeTC.fulfilled, (state, action) => {
            state.theme = action.payload.theme;
        });
    },
});
export const profileReducer = slice.reducer;
export const {setLoginUserInformationAC, setThemeToStateAC} = slice.actions;
