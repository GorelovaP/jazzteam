import React, {memo} from "react";
import "./supperInput.css";

export const SupperInput = memo(({type, error, label, ...restProps}) => {
    return (
        <div className="styledInput">
            {label && <label className="label">{label}</label>}
            <input
                type={type}
                {...restProps}
                className={`styledInput__body ${error ? "styledInput__body_error" : ""}`}
            />
        </div>
    );
});
