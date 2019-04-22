import React, { Component } from 'react';
import { Routes } from "./routes";
import  { BrowserRouter }  from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Routes/>
                </BrowserRouter>
            </div>
        )
    }
}

export default Home;