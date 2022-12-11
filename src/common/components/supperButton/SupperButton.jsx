import "./supperButton.css";
import React from "react";

const SuperButton = ({ red, className, ...restProps }) => {
  const finalClassName = `defaultBtn ${red ? "defaultBtn_red" : ""} `;

  return <button className={finalClassName} {...restProps} />;
};

export default SuperButton;
