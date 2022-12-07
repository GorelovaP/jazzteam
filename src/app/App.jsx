import React, {useEffect} from 'react';
import './App.css';
import {PagesRoutes} from "./pagesRoutes/PagesRoutes";
import {Header} from "../common/components/header/Header";
import {useDispatch} from "react-redux";
import {getFromLocalStorageTC} from "../redux/app-reducer";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFromLocalStorageTC())
    }, [])

    return (
        <div>
            <Header/>
            <PagesRoutes/>
        </div>
    );
}

export default App;
