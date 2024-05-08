import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import HelloTest from './pages/HelloTest.js'
import OngoingChallenge from './pages/challenge/OngoingChallenge.js';
import Join from './pages/user/Join.js';
import Login from './pages/user/Login.js';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HelloTest />
    },
    {
        path: "/join",
        element: <Join />
    },
    {
        path: "/login",
        element: <Login />
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