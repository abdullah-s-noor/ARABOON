import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../components/layouts/admin/AdminLayout.jsx";
import UserLayout from "../components/layouts/user/UserLayout.jsx";
import AdminHomePage from "../pages/admin/Home.jsx";
import {
    UserHomePage, MangaInformation, MangaList, Library, MangaRanking, TestPage, NotFound, Profile, ViewAll, Search, Chapter,
    CategoryManagement,MangaManagement
} from "../pages";
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
                path: '/manga/:mangaID',
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
                path: "/:username",
                element: <Profile />
            },
            {
                path: "/viewall",
                element: <ViewAll />
            },
            {
                path: "/search",
                element: <Search />
            },
            {
                path: "/manga/:mangaID/chapter/:chapterID",
                element: <Chapter />
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
            },
            {
                path: "category-management",
                element: <CategoryManagement />
            },
            {
                path:"manga-management",
                element:<MangaManagement/>
            }
        ]
    },
]);