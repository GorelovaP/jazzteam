import "./calendarModals.css"
import {useFormik} from "formik";
import * as Yup from "yup";
import {SupperInput} from "../../../common/components/supperInput/SupperInput";
import SuperButton from "../../../common/components/supperButton/SupperButton";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "../../../common/components/modal/Modal";
import {getNotesSelector} from "../../../redux/calendar/calendar-selectors";
import {changeNoteInDbTC} from "../../../redux/calendar/calendar-reducer";


export const CalendarEditModal = ({close, viewedCell}) => {

    const dispatch = useDispatch()

    const notes = useSelector(getNotesSelector)
    const note = notes.filter(note => note.date === viewedCell)

    const formik = useFormik({
        validationSchema: Yup.object({
            title: Yup.string().required("* Title field is required"),
            description: Yup.string().required("* Description field is required"),
        }),
        initialValues: {
            title: note[0].title,
            description: note[0].description,
        },
        onSubmit: (values) => {
            dispatch(changeNoteInDbTC({
                id: note[0].id,
                title: values.title,
                description: values.description,
                date: viewedCell
            }))
            formik.resetForm()
            close()
        },
    });


    return (<Modal close={close}>
            <form onSubmit={formik.handleSubmit}>
                <h3 className="modalBg__modal__header">Change note</h3>
                <div className="modalBg__modal__input">
                    <SupperInput
                        type="text"
                        placeholder="title"
                        error={!!(formik.errors.title && formik.touched.title)}
                        {...formik.getFieldProps("title")}
                    />
                    {formik.errors.title && formik.touched.title ? (
                        <div className="modalBg__modal__input__error">
                            {formik.errors.title}
                        </div>
                    ) : null}
                </div>
                <div className="modalBg__modal__input">
                    <SupperInput
                        type="text"
                        placeholder="description"
                        error={!!(formik.errors.description && formik.touched.description)}
                        {...formik.getFieldProps("description")}
                    />

                    {formik.errors.description && formik.touched.description ? (
                        <div className="modalBg__modal__input__error">
                            {formik.errors.description}
                        </div>
                    ) : null}
                </div>
                <div className="modalBg__modal__button">
                    <SuperButton
                        type="submit"
                        red={!!(formik.errors.title || formik.errors.description)}
                    > Edit </SuperButton>
                </div>
            </form>
        </Modal>
    )
}