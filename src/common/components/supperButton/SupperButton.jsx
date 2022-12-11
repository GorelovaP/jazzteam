import "./supperButton.css";
import React from "react";

const SuperButton = ({ red, className, ...restProps }) => {
  const finalClassName = `${s.default} ${red ? s.red : ""} `;

  return <button className={finalClassName} {...restProps} />;
};

export default SuperButton;
