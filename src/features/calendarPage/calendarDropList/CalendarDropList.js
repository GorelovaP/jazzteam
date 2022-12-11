import "./calendarDropList.css"
import { useSelector} from "react-redux";
import { useState} from "react";
import {useDebounce} from "../../../common/hooks/useDebounce";
import {FaSearch} from "react-icons/fa";
import {SupperInput} from "../../../common/components/supperInput/SupperInput";
import moment from "moment/moment";
import {getAllNotesSelector} from "../../../redux/calendar/calendar-selectors";


export const CalendarDropList = ({goToNote}) => {
    const notes = useSelector(getAllNotesSelector)

    const [value, setValue] = useState('')
    const debouncedValue = useDebounce(value, 700)

    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(debouncedValue) || note.description.toLowerCase().includes(debouncedValue))


    return (
        <div className="dropList">
            <div className="dropList__search">
                <FaSearch style={{position: "absolute", color: "black", top: "13px", left: "10px"}}/>
                <SupperInput type="text" value={value} onChange={(event) => setValue(event.target.value)}/>
            </div>
            <div className="dropList__notes">
                {filteredNotes.map(note => <div key={note.date} className={"dropList__notes__item"}
                                                onClick={() => goToNote(note.date)}>
                    <div className="dropList__notes__item__date">{moment.unix(note.date).format("DD/MM/YYYY")}</div>
                    <div className="dropList__notes__item__title">
                        <span className="dropList__notes__item__title__label">Title:</span>
                        <span>{note.title}</span>
                    </div>
                    <div>
                        <span className="dropList__notes__item__title__label">Description:</span>
                        <span>{note.description}</span>
                    </div>
                </div>)}
            </div>
        </div>
    )
}