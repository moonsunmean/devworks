import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext';

import ChallengeCategory from './components/challenge/ChallengeCategory.js';
import Analysis from "./pages/analysis/Analysis";
import Record from "./pages/record/Record";
import Support from "./pages/support/Support";
import OngoingChallenge from './pages/challenge/OngoingChallenge.js';
import Join from './pages/user/Join.js';
import Login from './pages/user/Login.js';
import MyPage from './pages/user/MyPage.js';
import Main from './pages/main/Main.js';
import Test from "./pages/main/Test";
import HelloTest from "./pages/main/HelloTest";

const router = createBrowserRouter([
    { path: "/", element: <Main /> },
    { path: "/test", element: <Test /> },
    { path: "/record", element: <Record /> },
    { path: "/analysis", element: <Analysis /> },
    { path: "/challenge", element: <ChallengeCategory /> },
    { path: "/support", element: <Support/> },
    { path: "/join", element: <Join /> },
    { path: "/login", element: <Login /> },
    { path: "/my-page", element: <MyPage /> },
    { path: "/ongoing", element: <OngoingChallenge /> },
    { path: "/hello-test", element: <HelloTest />}
]);

export default function App(){
    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
}