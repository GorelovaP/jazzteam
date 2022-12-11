import "../calendarModals.css"
import {useFormik} from "formik";
import * as Yup from "yup";
import {v1} from "uuid"
import {SupperInput} from "../../../../common/components/supperInput/SupperInput";
import SuperButton from "../../../../common/components/supperButton/SupperButton";
import {addNewNoteToDbTC} from "../../../../redux/calendar/calendar-reducer";
import {useDispatch} from "react-redux";
import {Modal} from "../../../../common/components/modal/Modal";


export const CalendarAddModal = ({close, viewedCell}) => {
    const dispatch = useDispatch()

    const formik = useFormik({
        validationSchema: Yup.object({
            title: Yup.string().required("* Title field is required"),
            description: Yup.string().required("* Description field is required"),
        }),
        initialValues: {
            title: "",
            description: "",
        },
        onSubmit: (values) => {
            dispatch(addNewNoteToDbTC({
                id: v1(),
                title: values.title,
                description: values.description,
                date: viewedCell
            }))
            formik.resetForm()
            close()
        },
    });


    return (
        <Modal close={close}>
            <form onSubmit={formik.handleSubmit}>
                <h3 className="modalBg__modal__header">Add new note</h3>
                <SupperInput
                    type="text"
                    placeholder="title"
                    error={!!(formik.errors.title && formik.touched.title)}
                    {...formik.getFieldProps("title")}
                />

                {formik.errors.title && formik.touched.title ? (
                    <div className="">
                        {formik.errors.title}
                    </div>
                ) : null}
                <SupperInput
                    type="text"
                    placeholder="description"
                    error={!!(formik.errors.description && formik.touched.description)}
                    {...formik.getFieldProps("description")}
                />

                {formik.errors.description && formik.touched.description ? (
                    <div className="">
                        {formik.errors.description}
                    </div>
                ) : null}
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