import "./editableSpan.css";
import { memo, useState } from "react";
import React from "react";
import { setTableDataToDbTC } from "../../../redux/table/table-reducer";
import { useDispatch } from "react-redux";

export const EditableSpan = memo(({ fieldValue, id, prop }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(fieldValue);

  const changeEditMode = (mode) => {
    setEditMode(mode);
  };

  const changeFinalValue = () => {
    if (value.trim().length) {
      changeEditMode(false);
      dispatch(setTableDataToDbTC({ id, prop, value }));
    }
  };

  const closeOnEnterEditMode = (keyCode) => {
    if (keyCode === 13) {
      changeFinalValue();
    }
  };

  return editMode ? (
    <input
      className="editableSpan__input"
      autoFocus
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      onBlur={changeFinalValue}
      onKeyDown={(event) => closeOnEnterEditMode(event.keyCode)}
    />
  ) : (
    <span onClick={() => changeEditMode(true)}>{fieldValue}</span>
  );
});
EditableSpan.displayName = "EditableSpan";
