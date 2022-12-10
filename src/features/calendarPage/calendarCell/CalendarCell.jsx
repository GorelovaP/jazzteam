import "./calendarCell.css"
import * as moment from "moment/moment";
import {useSelector} from "react-redux";
import {getCurrentDaySelector} from "../../../redux/calendar/calendar-selectors";


export const CalendarCell = ({dayCell}) => {
    const currentDay = useSelector(getCurrentDaySelector)

    const isCurrentDay = (day) => moment().isSame(day, "day")
    const isDaysFromSelectedMonth = (day) => moment(currentDay).isSame(day, "month")


    return (
        <div className={`calendar__table__cell ${isCurrentDay(dayCell) ? "calendar__table__cell_today" : null}`}>
            <div className="calendar__table__cell__day">
                {dayCell.dayName ?
                    <span className="calendar__table__cell__day__name">{dayCell.dayName}</span> : <span> </span>}
                <span
                    className={`calendar__table__cell__day__number ${isDaysFromSelectedMonth(dayCell) ? "calendar__table__cell__day__number_current" : ""}`}>{dayCell.format("D")}</span>
            </div>
        </div>

    )
}