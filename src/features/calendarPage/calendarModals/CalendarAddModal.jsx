import "./calendarModals.css";
import * as Yup from "yup";

import { Modal } from "../../../common/components/modal/Modal";
import React from "react";
import SuperButton from "../../../common/components/supperButton/SupperButton";
import { SupperInput } from "../../../common/components/supperInput/SupperInput";
import { addNewNoteToDbTC } from "../../../redux/calendar/calendar-reducer";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { v1 } from "uuid";

export const CalendarAddModal = ({ close, viewedCell }) => {
  const dispatch = useDispatch();

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
      dispatch(
        addNewNoteToDbTC({
          id: v1(),
          title: values.title,
          description: values.description,
          date: viewedCell,
        })
      );
      formik.resetForm();
      close();
    },
  });

  return (
    <Modal close={close}>
      <form onSubmit={formik.handleSubmit}>
        <h3 className="modalBg__modal__header">Add new note</h3>
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
          >
            {" "}
            Edit{" "}
          </SuperButton>
        </div>
      </form>
    </Modal>
  );
};
