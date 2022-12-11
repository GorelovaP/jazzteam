import "./calendarCell.css"
import * as moment from "moment/moment";
import {useSelector} from "react-redux";
import {getCurrentDaySelector, getNotesSelector} from "../../../redux/calendar/calendar-selectors";
import {memo, useState} from "react";


export const CalendarCell = memo(({dayCell, setViewedCell, setViewModeAddModal, setViewModeEditModal}) => {
    const [canClick, setCanClick] = useState(false)

    const currentDay = useSelector(getCurrentDaySelector)
    const notes = useSelector(getNotesSelector)

    const isCurrentDay = (day) => moment().isSame(day, "day")
    const isDaysFromSelectedMonth = (day) => moment(currentDay).isSame(day, "month")

    const startOfDay = dayCell.startOf('day').format("X")
    const endOfDay = dayCell.endOf('day').format("X")
    const note = notes.filter(note => note.date >= startOfDay && note.date <= endOfDay)
    if (note.length && !canClick) {
        setCanClick(true)
    }

    const onDoubleClick = () => {
        setViewModeAddModal(true)
        setViewedCell(startOfDay)
    }

    const handleClick = () => {
        setViewModeEditModal(true)
        setViewedCell(startOfDay)
    }

    return (
        <div onDoubleClick={() => !canClick ? onDoubleClick() : () => false}
             className={`calendar__table__cell ${isCurrentDay(dayCell) ? "calendar__table__cell_today" : null}`}>
            <div onClick={() => canClick ? handleClick() : () => false}
                 className={`calendar__table__cell__day  ${note.length ? "calendar__table__cell__day_withNote" : ""}`}>
                <div className="calendar__table__cell__day__data">
                    {dayCell.dayName ?
                        <span className="calendar__table__cell__day__data__name">{dayCell.dayName}</span> :
                        <span> </span>}
                    <span
                        className={`calendar__table__cell__day__data__number ${isDaysFromSelectedMonth(dayCell) ? "calendar__table__cell__day__number_current" : ""}`}>
                    {dayCell.format("D")}
                </span>
                </div>
                <div className="calendar__table__cell__day__noteArea">
                    {
                        note.map(note => <div key={note.date}
                                              className="calendar__table__cell__day__noteArea__note">
                            <div className="calendar__table__cell__day__noteArea__note__title">
                                {note.title}
                            </div>
                            <div className="calendar__table__cell__day__noteArea__note__description">
                                {note.description}
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>

    )
})

