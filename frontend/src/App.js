import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Analysis from "./pages/Analysis";
function App(){
    return(
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/analysis" element={<Analysis/>}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;