import {rootReducer} from "../../app/reducers";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { store } from "../../app/store";

export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatchType = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
