import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import s from './supperButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className,
        ...restProps
    }
) => {
    const finalClassName = `${s.default} ${red ? s.red : ""} `

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
}

export default SuperButton
