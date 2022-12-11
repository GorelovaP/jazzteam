import "./calendarPage.css";
import * as moment from "moment/moment";

import {
  getAllNotesFromDbTC,
  getNotesWithLimitsFromDbTC,
  setDataNewCurrentDayAC,
  setEndMonthDayCodeAC,
  setNewCalendarAC,
  setStartMonthDayCodeAC,
} from "../../redux/calendar/calendar-reducer";
import {
  getCalendarSelector,
  getCurrentDaySelector,
  getNotesSelector,
} from "../../redux/calendar/calendar-selectors";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillCaretRightFill } from "react-icons/bs";

import { CalendarAddModal } from "./calendarModals/CalendarAddModal";
import { CalendarCell } from "./calendarCell/CalendarCell";
import { CalendarDropList } from "./calendarDropList/CalendarDropList";
import { CalendarEditModal } from "./calendarModals/CalendarEditModal";

import React from "react";
import { ThemeWrapper } from "../../common/components/themeWrapper/ThemeWrapper";

import { v1 } from "uuid";

export const CalendarPage = () => {
  const [viewModeAddModal, setViewModeAddModal] = useState(false);
  const [viewModeEditModal, setViewModeEditModal] = useState(false);
  const [viewedCell, setViewedCell] = useState(0);

  const dispatch = useDispatch();

  const currentDay = useSelector(getCurrentDaySelector);
  const calendar = useSelector(getCalendarSelector);
  const notes = useSelector(getNotesSelector);

  useEffect(() => {
    moment.updateLocale("en", { week: { dow: 1 } });
    dispatch(setDataNewCurrentDayAC({ currentDay: moment() }));
    getCalendarDays({ currentDay: moment() });
  }, []);

  useEffect(() => {
    dispatch(getAllNotesFromDbTC());
  }, [notes]);

  const getCalendarDays = useCallback(
    ({ currentDay }) => {
      const startMonthDay = moment(currentDay).startOf("month").startOf("week");
      const startMonthDayCode = startMonthDay.format("X");
      dispatch(
        setStartMonthDayCodeAC({ startMonthDayCode: startMonthDayCode })
      );

      const endMonthDay = moment(currentDay).endOf("month").endOf("week");
      const endDayCode = endMonthDay.format("X");
      dispatch(setEndMonthDayCodeAC({ endDayCode }));

      const monthName = [
        "Monday",
        "Tuesday ",
        "Wednesday ",
        "Thursday ",
        "Friday ",
        "Saturday ",
        "Sunday",
      ];

      const calendar = [];

      const day = startMonthDay.clone();

      while (!day.isAfter(endMonthDay)) {
        calendar.push(day.clone());
        day.add(1, "day");
      }
      for (let i = 0; i < 7; i++) {
        calendar[i].dayName = monthName[i];
      }
      for (let i = 0; i < calendar.length; i++) {
        calendar[i].id = v1();
      }
      dispatch(setNewCalendarAC({ calendar }));
      dispatch(
        getNotesWithLimitsFromDbTC({
          more: startMonthDayCode,
          less: endDayCode,
        })
      );
    },
    [currentDay]
  );

  const getPreviousMonth = () => {
    const previousMonth = {
      currentDay: moment(currentDay).subtract(1, "month").format("MM/DD/YYYY"),
    };
    dispatch(setDataNewCurrentDayAC(previousMonth));
    getCalendarDays(previousMonth);
  };

  const getNextMonth = () => {
    const nextMonth = {
      currentDay: moment(currentDay).add(1, "month").format("MM/DD/YYYY"),
    };
    dispatch(setDataNewCurrentDayAC(nextMonth));
    getCalendarDays(nextMonth);
  };

  const getToday = () => {
    const today = { currentDay: moment().format("MM/DD/YYYY") };
    dispatch(setDataNewCurrentDayAC(today));
    getCalendarDays(today);
  };

  const goToNote = (date) => {
    const newCurrentDay = {
      currentDay: moment.unix(date).format("MM/DD/YYYY"),
    };
    dispatch(setDataNewCurrentDayAC(newCurrentDay));
    getCalendarDays(newCurrentDay);
  };

  return (
    <ThemeWrapper>
      {viewModeAddModal && (
        <CalendarAddModal
          viewedCell={viewedCell}
          close={() => setViewModeAddModal(false)}
        />
      )}
      {viewModeEditModal && (
        <CalendarEditModal
          viewedCell={viewedCell}
          close={() => setViewModeEditModal(false)}
        />
      )}
      <div className="calendarWrapper">
        <div className="calendar">
          <div className="calendar__settings">
            <div className="calendar__settings__standard">
              <div
                onClick={getPreviousMonth}
                className="calendar__settings__button"
              >
                <BsFillCaretLeftFill size={"40px"} />
              </div>
              <div className="calendar__settings__data">
                <span className="calendar__settings__data_element">
                  {moment(currentDay).format("MMMM")}
                </span>
                <span className="calendar__settings__data_element">
                  {moment(currentDay).format("YYYY")}
                </span>
              </div>
              <div
                onClick={getNextMonth}
                className="calendar__settings__button"
              >
                <BsFillCaretRightFill size={"40px"} />
              </div>
              <button
                onClick={getToday}
                className="calendar__settings__button calendar__settings__button_today "
              >
                Today
              </button>
            </div>
          </div>
          <div className="calendar__table">
            {calendar.map((dayCell) => (
              <CalendarCell
                key={dayCell.id}
                dayCell={dayCell}
                setViewedCell={setViewedCell}
                setViewModeAddModal={setViewModeAddModal}
                setViewModeEditModal={setViewModeEditModal}
              />
            ))}
          </div>
        </div>
        <CalendarDropList goToNote={goToNote} />
      </div>
    </ThemeWrapper>
  );
};
