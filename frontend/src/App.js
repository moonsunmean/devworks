import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import ChallengeCategory from './components/challenge/ChallengeCategory.js';
import HelloTest from './pages/HelloTest.js'

const router = createBrowserRouter([
    {
        path: "/",
        element: <ChallengeCategory />
    },
    {
        path: "/test",
        element: <HelloTest />
    }
]);

export default function App(){
    return (
        <RouterProvider router={router} />
    );
}