import moment from "moment/moment";
import {useSelector} from "react-redux";
import "./profileNotes.css"
import {getAllNotesSelector} from "../../../redux/calendar/calendar-selectors";


export const ProfileNotes = () => {
    const notes = useSelector(getAllNotesSelector);

    return (
        <div className="profileNotes">
            <h3 className="profileNotes__header">Notes in the calendar</h3>
            <ul className="profileNotes__list">
                {
                    notes.map(note => {
                        return <li key={note.date}>
                            <span className="profileNotes__list__date">
                                {moment.unix(note.date).format("DD/MM/YYYY")}
                            </span>
                            <span className="profileNotes__list__title">{note.title} - </span>
                            <span className="profileNotes__list__description">{note.description}</span>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}