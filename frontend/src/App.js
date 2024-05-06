import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import ChallengeCategory from './components/challenge/ChallengeCategory.js';
import Main from "./pages/Main";
import Analysis from "./pages/Analysis";
import Record from "./pages/Record";
import Help from "./pages/Help";

const router = createBrowserRouter([
    { path: "/", element: <Main /> },
    { path: "/record", element: <Record /> },
    { path: "/analysis", element: <Analysis /> },
    { path: "/challenge", element: <ChallengeCategory /> },
    { path: "/help", element: <Help/> },
]);

export default function App(){
    return (
        <RouterProvider router={router} />
    );
}