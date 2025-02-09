import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Inshome from "../pages/Inspector/Inshome";
import Insights from "../pages/Inspector/Insights";
import Inspect from "../pages/Inspector/Inspect";
import { Signup } from "../pages/Signup";
import SingleUniversity from "../pages/SingleUniversity"; // Importing SingleUniversity component
import { Signin } from "../pages/Signin";
import { University } from "../pages/University";
import { Inspector } from "../pages/Inspector";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/signin",
                element: <Signin />
            },
            {
                path: "/university/:id",
                element: <SingleUniversity />,
                loader: ({ params }) => fetch(`http://localhost:5000/university/${params.id}`)
            },
        ]
    },
    {
        path: "/inspector",
        element: <App />,
        children: [
            {
                path: "/inspector/Home",
                element: <Inspector />
            },
            {
                path: "/inspector/insHome",
                element: <Inshome />
            },
            {
                path: "/inspector/inspect",
                element: <Inspect />
            },
            {
                path: "/inspector/insights",
                element: <Insights />
            },
            {
                path: "/inspector/university/:id",
                element: <Insights />,
                loader: ({ params }) => fetch(`http://localhost:5000/university/${params.id}`),
            },
        ]
    },
    {
        path: "/university",
        element: <University />,
    }
]);

export default router;
