import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import ChallengeCategory from './components/challenge/ChallengeCategory.js';
import Main from "./pages/Main";

const router = createBrowserRouter([
    {
        path: "/challenge",
        element: <ChallengeCategory />
    },
    {
        path: "/",
        element: <Main />
    }
]);

export default function App(){
    return (
        <RouterProvider router={router} />
    );
}