import { createSlice} from "@reduxjs/toolkit";



const slice = createSlice({
    name: "calendar",
    initialState: {
        currentDay: "",
        calendar: [],
        events: []
    },

    reducers: {
        setDataNewCurrentDayAC(state, action) {
            state.currentDay = action.payload.currentDay
        },
        setNewCalendarAC(state, action) {
            state.calendar = action.payload.calendar
        }
    },
});
export const calendarReducer = slice.reducer;
export const {setDataNewCurrentDayAC, setNewCalendarAC} = slice.actions;
