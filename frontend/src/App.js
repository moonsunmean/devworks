import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import ChallengeCategory from './components/challenge/ChallengeCategory.js';
import Main from "./pages/Main";
import Analysis from "./pages/analysis/Analysis";
import Record from "./pages/record/Record";
import Support from "./pages/support/Support";

const router = createBrowserRouter([
    { path: "/", element: <Main /> },
    { path: "/record", element: <Record /> },
    { path: "/analysis", element: <Analysis /> },
    { path: "/challenge", element: <ChallengeCategory /> },
    { path: "/support", element: <Support/> },
]);

export default function App(){
    return (
        <RouterProvider router={router} />
    );
}