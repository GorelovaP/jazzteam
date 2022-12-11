import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { calendarAPI } from "../../api/api";
import { errorHandler } from "../../common/helpers/errorHendler";
import { setIsLoadingAC } from "../app/app-reducer";

export const getNotesWithLimitsFromDbTC = createAsyncThunk(
  "calendar/getNotesWithLimitsFromDb",
  async ({ more, less }, { dispatch }) => {
    try {
      dispatch(setIsLoadingAC({ isLoading: true }));
      const res = await calendarAPI.getNotesWithLimits(more, less);
      return { data: res.data };
    } catch (err) {
      errorHandler({ err, dispatch });
    } finally {
      dispatch(setIsLoadingAC({ isLoading: false }));
    }
  }
);

export const addNewNoteToDbTC = createAsyncThunk(
  "calendar/addNewNoteToDb",
  async ({ id, title, description, date }, { dispatch }) => {
    try {
      dispatch(setIsLoadingAC({ isLoading: true }));
      const res = await calendarAPI.setNewNote({
        id,
        title,
        description,
        date,
      });
      return { data: res.data };
    } catch (err) {
      errorHandler({ err, dispatch });
    } finally {
      dispatch(setIsLoadingAC({ isLoading: false }));
    }
  }
);
export const changeNoteInDbTC = createAsyncThunk(
  "calendar/changeNoteInDb",
  async ({ id, title, description, date }, { dispatch, getState }) => {
    const state = getState();
    try {
      dispatch(setIsLoadingAC({ isLoading: true }));
      await calendarAPI.changeNote({ id, title, description, date }, id);
      dispatch(
        getNotesWithLimitsFromDbTC({
          more: state.calendar.startMonthDayCode,
          less: state.calendar.endMonthDayCode,
        })
      );
    } catch (err) {
      errorHandler({ err, dispatch });
    } finally {
      dispatch(setIsLoadingAC({ isLoading: false }));
    }
  }
);

export const getAllNotesFromDbTC = createAsyncThunk(
  "calendar/getAllNotesFromDb",
  async (params, { dispatch }) => {
    try {
      dispatch(setIsLoadingAC({ isLoading: true }));
      const res = await calendarAPI.getAllNotes();
      return { data: res.data };
    } catch (err) {
      errorHandler({ err, dispatch });
    } finally {
      dispatch(setIsLoadingAC({ isLoading: false }));
    }
  }
);

const slice = createSlice({
  name: "calendar",
  initialState: {
    currentDay: "",
    calendar: [],
    notes: [],
    allNotes: [],
    startMonthDayCode: "",
    endMonthDayCode: "",
  },

  reducers: {
    setDataNewCurrentDayAC(state, action) {
      state.currentDay = action.payload.currentDay;
    },
    setNewCalendarAC(state, action) {
      state.calendar = action.payload.calendar;
    },
    setStartMonthDayCodeAC(state, action) {
      state.startMonthDayCode = action.payload.startMonthDayCode;
    },
    setEndMonthDayCodeAC(state, action) {
      state.endMonthDayCode = action.payload.endMonthDayCode;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotesWithLimitsFromDbTC.fulfilled, (state, action) => {
      state.notes = action.payload.data;
    });
    builder.addCase(addNewNoteToDbTC.fulfilled, (state, action) => {
      state.notes = [...state.notes, action.payload.data];
    });
    builder.addCase(getAllNotesFromDbTC.fulfilled, (state, action) => {
      state.allNotes = action.payload.data;
    });
  },
});

export const calendarReducer = slice.reducer;
export const {
  setDataNewCurrentDayAC,
  setNewCalendarAC,
  setStartMonthDayCodeAC,
  setEndMonthDayCodeAC,
} = slice.actions;
