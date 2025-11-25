// ProtectedRoute.js
import { UserContext } from "../context/UserContext";
import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { userToken, userData, contextLoading } = useContext(UserContext)
    const location = useLocation();
    if (!contextLoading) {
        if (!allowedRoles.includes(("guest")) && !userToken) {
            const pathnameArr = location.pathname.split("/")
            if (pathnameArr[1] === "library" && pathnameArr[2] && !["favorites", "notifications", "completed-reads", "currently-reading", "reading-later"].includes(pathnameArr[2].toLowerCase())) {
                return <Navigate to="/not-found" replace />
            }
            return <Navigate to="/" replace state={{ next: location.pathname }} />;
        }

        if (userData && !allowedRoles.includes((userData?.Role.toLowerCase()))) {
            if(userData.Role==="Admin"&&(location.pathname==="/")){
                return <Navigate to="/dashboard" replace />
            }
            return <Navigate to="/not-found" replace />;
        }

    }
    return children;
};

export default ProtectedRoute;
