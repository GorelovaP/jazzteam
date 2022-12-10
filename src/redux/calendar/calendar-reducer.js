import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setIsLoadingAC} from "../app/app-reducer";
import {calendarAPI} from "../../api/api";
import {errorHandler} from "../../common/helpers/errorHendler";

export const getNotesWithLimitsFromDbTC = createAsyncThunk(
    "calendar/getNotesWithLimitsFromDb",
    async ({more, less}, {dispatch}) => {
        try {
            dispatch(setIsLoadingAC({isLoading: true}));
            const res = await calendarAPI.getNotesWithLimits(more, less);
            return {data: res.data};
        } catch (err) {
            errorHandler({err, dispatch});
        } finally {
            dispatch(setIsLoadingAC({isLoading: false}));
        }
    }
);

const slice = createSlice({
    name: "calendar",
    initialState: {
        currentDay: "",
        calendar: [],
        notes: [],
        startDayCode: "",
        endDayCode: "",
    },

    reducers: {
        setDataNewCurrentDayAC(state, action) {
            state.currentDay = action.payload.currentDay
        },
        setNewCalendarAC(state, action) {
            state.calendar = action.payload.calendar
        },
        setStartDayCodeAC(state, action) {
            state.startDayCode = action.payload.startDayCode
        },
        setEndDayCodeAC(state, action) {
            state.endDayCode = action.payload.endDayCode
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getNotesWithLimitsFromDbTC.fulfilled, (state, action) => {
            state.notes = action.payload.data
        });
    },
});


export const calendarReducer = slice.reducer;
export const {setDataNewCurrentDayAC, setNewCalendarAC, setStartDayCodeAC, setEndDayCodeAC} = slice.actions;
