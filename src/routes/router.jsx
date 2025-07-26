import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../components/layouts/admin/AdminLayout.jsx";
import UserLayout from "../components/layouts/user/UserLayout.jsx";
import UserHomePage from "../pages/user/Home.jsx";
import AdminHomePage from "../pages/admin/Home.jsx";
import MangaInformation from "../pages/user/MangaInformation.jsx";
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