import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HelloTest from './pages/HelloTest.js'
import OngoingChallenge from './pages/challenge/OngoingChallenge.js';
import Join from './pages/user/Join.js';
import Login from './pages/user/Login.js';
import Main from './pages/main/Main.js';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />
    },
    {
        path: "/test",
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