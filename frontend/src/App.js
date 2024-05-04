import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import HelloTest from './pages/HelloTest.js'
import OngoingChallenge from './pages/challenge/OngoingChallenge.js';
import Login from './pages/login/Login.js';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/test",
        element: <HelloTest />
    },
    {
        path: "/ongoing",
        element: <OngoingChallenge />
    }
]);

export default function App(){
    return (
        <RouterProvider router={router} />
    );
}