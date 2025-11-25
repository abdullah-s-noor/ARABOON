import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../components/layouts/admin/AdminLayout.jsx";
import UserLayout from "../components/layouts/user/UserLayout.jsx";
import AdminHomePage from "../pages/admin/Home.jsx";
import {
    UserHomePage, MangaInformation, MangaList, Library, MangaRanking, TestPage, NotFound, Profile, ViewAll, Search, Chapter,
    CategoryManagement, MangaManagement, UserManagement, BannerManagement
} from "../pages";
import ProtectedRoute from "./ProtectedRoute.jsx";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                path: "/",
                element:  <ProtectedRoute allowedRoles={["user","guest"]}><UserHomePage /></ProtectedRoute>,
            },
            {
                path: '/manga/:mangaID',
                element: <ProtectedRoute allowedRoles={["user","guest"]}><MangaInformation /></ProtectedRoute>
            },
            {
                path: '/manga-list',
                element: <ProtectedRoute allowedRoles={["user","guest"]}> <MangaList /></ProtectedRoute>
            },
            {
                path: '/library',
                element: <ProtectedRoute allowedRoles={["user"]}> <Library /></ProtectedRoute>
            },
            {
                path: '/library/:section',
                element: <ProtectedRoute allowedRoles={["user"]}><Library /></ProtectedRoute>
            },
            {
                path: '/manga-ranking',
                element: <ProtectedRoute allowedRoles={["user","guest"]}><MangaRanking /></ProtectedRoute>
            },
            {
                path: '/test-page',
                element: <TestPage />
            },
            {
                path: "/viewall",
                element: <ProtectedRoute allowedRoles={["user","guest"]}><ViewAll /></ProtectedRoute>
            },
            {
                path: "/search",
                element: <ProtectedRoute allowedRoles={["user","guest"]}> <Search /></ProtectedRoute>
            },
            {
                path: "/manga/:mangaID/chapter/:chapterID",
                element: <Chapter />
            },

            {
                path: '/not-found',
                element: <NotFound />
            },
            {
                path: '*',
                element: <NotFound />
            },
            {
                path: "/:username",
                element: <Profile />
            },
        ],
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute allowedRoles={["admin"]}><AdminLayout /></ProtectedRoute>,
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
                path: "manga-management",
                element: <MangaManagement />
            },
            {
                path: 'manga/:mangaID',
                element: <MangaInformation />
            },
            {
                path: "user-management",
                element: <UserManagement />
            },
            {
                path: "banner-management",
                element: <BannerManagement />
            },
            
            {
                path: 'not-found',
                element: <NotFound />
            },

        ]
    },
]);