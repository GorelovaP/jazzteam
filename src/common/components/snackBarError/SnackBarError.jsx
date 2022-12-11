import "./snackBarError.css";
import { memo, useEffect } from "react";

import React from "react";
import { VscChromeClose } from "react-icons/vsc";
import { setAppErrorAC } from "../../../redux/app/app-reducer";

import { useDispatch } from "react-redux";

export const SnackBarError = memo(({ text }) => {
  const dispatch = useDispatch();
  const onClickAction = () => {
    dispatch(setAppErrorAC(""));
  };

  useEffect(() => {
    let showError = setTimeout(() => {
      dispatch(setAppErrorAC(""));
    }, 7000);

    return () => clearTimeout(showError);
  }, []);

  return (
    <div className="snackBarError">
      <span className="snackBarError__text">{text}</span>
      <VscChromeClose
        className="snackBarError__cross"
        onClick={onClickAction}
        size={"20px"}
      />
    </div>
  );
});
