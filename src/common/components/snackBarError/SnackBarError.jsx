import {memo, useEffect} from "react";
import {useDispatch} from "react-redux";
import {setAppErrorAC} from "../../../redux/app-reducer";
import {VscChromeClose} from "react-icons/vsc";
import "./snackBarError.css"

export const MySnackbar = memo(({text}) => {
    const dispatch = useDispatch()
    const onClickAction = () => {
        dispatch(setAppErrorAC(''))
    }

    useEffect(() => {
        let showError = setTimeout(() => {
            dispatch(setAppErrorAC(''))
        }, 7000)

        return () => clearTimeout(showError)
    }, [])

    return (
        <div className="snackBarError">
            <span className='snackBarError__text'>{text}</span>
            <VscChromeClose className='snackBarError__cross' onClick={onClickAction} size={'20px'}/>
        </div>
    )
})