import "./supperInput.css";
import React, { memo } from "react";

export const SupperInput = memo(({ type, error, label, ...restProps }) => {
  return (
    <div className="styledInput">
      {label && <label className="label">{label}</label>}
      <input
        type={type}
        {...restProps}
        className={`styledInput__body ${
          error ? "styledInput__body_error" : ""
        }`}
      />
    </div>
  );
});
SupperInput.displayName = "SupperInput";
