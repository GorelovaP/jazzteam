import {ThemeWrapper} from "../../common/components/themeWrapper/ThemeWrapper";
import * as moment from 'moment/moment';
import "./calendarPage.css"
import {useDispatch, useSelector} from "react-redux";
import {BsFillCaretLeftFill} from "react-icons/bs";
import {BsFillCaretRightFill} from "react-icons/bs";
import {CalendarCell} from "./calendarCell/CalendarCell";
import {setDataNewCurrentDayAC, setNewCalendarAC} from "../../redux/calendar/calendar-reducer";
import {useEffect} from "react";
import {getCalendarSelector, getCurrentDaySelector} from "../../redux/calendar/calendar-selectors";

export const CalendarPage = () => {
    const dispatch = useDispatch()
    const currentDay = useSelector(getCurrentDaySelector)
    const calendar = useSelector(getCalendarSelector)

    useEffect(() => {

        dispatch(setDataNewCurrentDayAC({currentDay: moment()}))
        getCalendarDays({currentDay: moment()})
    }, [])


    const getCalendarDays = ({currentDay}) => {
        moment.updateLocale("en", {week: {dow: 1}})
        const startDay = moment(currentDay).startOf("month").startOf("week")
        const endDay = moment(currentDay).endOf("month").endOf("week")
        const monthName = ['Monday', 'Tuesday ', 'Wednesday ', 'Thursday ', 'Friday ', 'Saturday ', 'Sunday'];
        const calendar = [];
        const day = startDay.clone()

        while (!day.isAfter(endDay)) {
            calendar.push(day.clone())
            day.add(1, "day")
        }
        for (let i = 0; i < 7; i++) {
            calendar[i].dayName = monthName[i]
        }
        dispatch(setNewCalendarAC({calendar}))
    }


    const getPreviousMonth = () => {
        const previousMonth = {currentDay: moment(currentDay).subtract(1, "month").format('MM/DD/YYYY')}
        dispatch(setDataNewCurrentDayAC(previousMonth))
        getCalendarDays(previousMonth)
    }

    const getNextMonth = () => {
        const nextMonth = {currentDay: moment(currentDay).add(1, "month").format('MM/DD/YYYY')}
        dispatch(setDataNewCurrentDayAC(nextMonth))
        getCalendarDays(nextMonth)
    }

    const getToday = () => {
        const today = {currentDay: moment().format('MM/DD/YYYY')}
        dispatch(setDataNewCurrentDayAC(today))
        getCalendarDays(today)
    }





    return <ThemeWrapper>
        <div className="calendarWrapper">
            <div className="calendar__settings">
                <div className="calendar__settings__standard">
                    <div onClick={getPreviousMonth} className="calendar__settings__button">
                        <BsFillCaretLeftFill size={"40px"}/>
                    </div>
                    <div className="calendar__settings__data">
                            <span className="calendar__settings__data_element">
                                {moment(currentDay).format("MMMM")}
                            </span>
                        <span className="calendar__settings__data_element">
                               {moment(currentDay).format("YYYY")}
                          </span>
                    </div>
                    <div onClick={getNextMonth} className="calendar__settings__button">
                        <BsFillCaretRightFill size={"40px"}/>
                    </div>
                    <button onClick={getToday} className="calendar__settings__button calendar__settings__button_today ">
                        Today
                    </button>
                </div>
                <div className="calendar__settings__search">

                </div>
            </div>
            <div className="calendar__table">
                {calendar.map((dayCell, index) => <CalendarCell key={index} dayCell={dayCell}/>)}
            </div>
        </div>
    </ThemeWrapper>
}

