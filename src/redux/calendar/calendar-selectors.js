export const getCurrentDaySelector = (state) => {
  return state.calendar.currentDay;
};
export const getCalendarSelector = (state) => {
  return state.calendar.calendar;
};
export const getEndMonthDayCodeSelector = (state) => {
  return state.calendar.endMonthDayCode;
};
export const getStartMonthDayCodeSelector = (state) => {
  return state.calendar.startMonthDayCode;
};
export const getNotesSelector = (state) => {
  return state.calendar.notes;
};
export const getAllNotesSelector = (state) => {
  return state.calendar.allNotes;
};
