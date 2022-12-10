import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setIsLoadingAC} from "../app/app-reducer";
import {calendarAPI} from "../../api/api";
import {errorHandler} from "../../common/helpers/errorHendler";

export const setToLocalStorageThemeTC = createAsyncThunk(
    "profile/setToLocalStorageTheme",
    ({theme}, {dispatch}) => {
        localStorage.setItem("Theme", JSON.stringify(theme));
        return {theme: theme};
    }
);

export const getAllNotesFromDbTC = createAsyncThunk(
    "profile/getAllNotesFromDb",
    async (params, {dispatch}) => {
        try {
            debugger
            dispatch(setIsLoadingAC({isLoading: true}));
            const res = await calendarAPI.getAllNotes();
            return {data: res.data};
        } catch (err) {
            errorHandler({err, dispatch});
        } finally {
            dispatch(setIsLoadingAC({isLoading: false}));
        }
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
        },
        notes: []
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
        builder.addCase(getAllNotesFromDbTC.fulfilled, (state, action) => {
            state.notes = action.payload.data;
        });
    },
});
export const profileReducer = slice.reducer;
export const {setLoginUserInformationAC, setThemeToStateAC} = slice.actions;
