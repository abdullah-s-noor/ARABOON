import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./AdminLayout.jsx";
import UserLayout from "./UserLayout.jsx";
import UserHomePage from "../userDashboard/home/Home.jsx";
import AdminHomePage from "../adminDashboard/home/Home.jsx";
import MangaInformation from "../userDashboard/mangaInformation/MangaInformation.jsx";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        errorElement: <h1>page not found</h1>,
        children: [
            {
                path: "/",
                element: <UserHomePage />,
            },
            {
                path:'/manga-information',
                element:<MangaInformation/>
            }
        ],
    },
    {
        path: "/dashboard",
        element: <AdminLayout />,
        errorElement: <h1>page not found</h1>,
        children: [
            {
                path: "",
                element: <AdminHomePage />,
            }
        ]
    },
]);