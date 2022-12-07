import {Navigate, Outlet} from 'react-router-dom'

import {PATH} from '../PagesRoutes'
import {useSelector} from "react-redux";

export const ProtectedLoginRoute = () => {
    const isLoggedIn = useSelector(state => state.app.isLoggedIn)

    return isLoggedIn ? <Outlet/> : <Navigate to={PATH.LOGIN}/>
}
