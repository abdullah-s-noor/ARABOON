import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../components/layouts/admin/AdminLayout.jsx";
import UserLayout from "../components/layouts/user/UserLayout.jsx";
import AdminHomePage from "../pages/admin/Home.jsx";
import { UserHomePage, MangaInformation, MangaList, Library, MangaRanking,TestPage,NotFound } from "../pages";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                path: "/",
                element: <UserHomePage />,
            },
            {
                path: '/manga-information',
                element: <MangaInformation />
            },
            {
                path: '/manga-list',
                element: <MangaList />
            },
            {
                path: '/library',
                element: <Library />
            },
            {
                path: '/library/:section',
                element: <Library />
            },
            {
                path: '/manga-ranking',
                element: <MangaRanking />
            }, 
            {
                path: '/test-page',
                element: <TestPage />
            },
            {
                path: '/not-found',
                element: <NotFound />
            },

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