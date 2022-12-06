import React, {DetailedHTMLProps, InputHTMLAttributes, memo} from "react";
import "./supperInput.css"

export const SupperInput: React.FC<PropsType> = memo(
    ({type, error, label, ...restProps}) => {
        return (
            <div className="styledInput">
                {label && <label className='label'>{label}</label>}
                <input type={type} {...restProps}
                       className={`styledInput__body ${error ? "styledInput__body_error" : ""}`}/>
            </div>
        )
    }
)


// types
type PropsType = DefaultInputPropsType & {
    type?: string
    label?: string
    error?: boolean
}
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>