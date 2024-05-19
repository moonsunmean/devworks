import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './components/UserContext';

import Analysis from "./pages/analysis/Analysis";
import Record from "./pages/record/Record";
import Support from "./pages/support/Support";
import OngoingChallenge from './pages/challenge/OngoingChallenge.js';
import FinishedChallenge from './pages/challenge/FinishedChallenge.js';
import MyChallenge from './pages/challenge/MyChallenge.js';
import EditChallenge from './pages/challenge/EditChallenge.js';
import CreateChallenge from './pages/challenge/CreateChallenge.js';
import Join from './pages/user/Join.js';
import Login from './pages/user/Login.js';
import MyPage from './pages/user/MyPage.js';
import EditUser from './pages/user/EditUser.js';
import Main from './pages/main/Main.js';
import Test from "./pages/main/Test";
import HelloTest from "./pages/main/HelloTest";

const router = createBrowserRouter([
    { path: "/", element: <Main /> },
    { path: "/test", element: <Test /> },
    { path: "/record", element: <Record /> },
    { path: "/analysis", element: <Analysis /> },
    { path: "/support", element: <Support/> },
    { path: "/join", element: <Join /> },
    { path: "/login", element: <Login /> },
    { path: "/my-page", element: <MyPage /> },
    { path: "/edit-user", element: <EditUser /> },
    { path: "/ongoing", element: <OngoingChallenge /> },
    { path: "/finished", element: <FinishedChallenge /> },
    { path: "/my-challenge", element: <MyChallenge /> },
    { path: "/edit-challenge", element: <EditChallenge /> },
    { path: "/create-challenge", element: <CreateChallenge /> },
    { path: "/hello-test", element: <HelloTest />}
]);

export default function App(){
    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
}