export const getCurrentDaySelector = (state) => {
    return state.calendar.currentDay
}
export const getCalendarSelector = (state) => {
    return state.calendar.calendar
}
export const getEndDayCodeSelector = (state) => {
    return state.calendar.endDayCode
}
export const getStartDayCodeSelector = (state) => {
    return state.calendar.startDayCode
}
export const getNotesSelector = (state) => {
    return state.calendar.notes
}
