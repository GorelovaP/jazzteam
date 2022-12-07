import React from 'react';
import './App.css';
import {PagesRoutes} from "./pagesRoutes/PagesRoutes";
import {Header} from "../common/components/header/Header";

function App() {
    return (
        <div>
            <Header/>
            <PagesRoutes/>
        </div>
    );
}

export default App;
