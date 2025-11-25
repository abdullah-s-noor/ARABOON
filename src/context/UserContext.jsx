// src/contexts/UserContext.jsx

import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { api, setApiAccessToken, clearApiAccessToken } from "../services/api";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

// @ts-ignore
export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [contextLoading, setContextLoading] = useState(true);
    const [authDialog, setAuthDialog] = useState({ open: false, mode: null });
    const [nextPath, setNextPath] = useState(null);

    // Function to check for a valid session on page load
    const checkUserSession = async () => {
        setContextLoading(true);
        try {
            const { data } = await api.post("/Authentication/GenerateRefreshToken");
            const newAccessToken = data.data.access;

            // Update the access token in state and API instance
            setUserToken(newAccessToken);
            setApiAccessToken(newAccessToken);
            decodeUserData(newAccessToken);
        } catch (error) {//Refresh token not found// لم يتم العثور على رمز التحديث
            // Session is not valid, clear any old tokens
            if (error.response.data.message === "لم يتم العثور على رمز التحديث" || error.response.data.message === "Refresh token not found") {
                return
            } else {
                logout();
            }
        } finally {
            setContextLoading(false);
        }
    };

    const decodeUserData = (token) => {
        try {
            const decoded = jwtDecode(token);
            decoded["ID"] = Number(decoded["ID"]);
            console.log(decoded)
            setUserData(decoded);
        } catch (error) {
            console.error("Invalid token:", error);
            setUserData(null);
        }
    };

    const login = (token) => {
        setUserToken(token);
        setApiAccessToken(token);
        decodeUserData(token);
        //this for admin only because when login  will  delete the navbar from the userLayout and the dialog doesnot  called closeAuthDialog so 
        //the data stay in authDialog and when logout and return  to guest will happend a problem because render the navbar where the authDialog have  a past value  not false
        setAuthDialog({ open: false, mode: null })
        setTimeout(() => {
            setContextLoading(false);
        }, 400);

    };

    const logout = async (handleAuthorizeLogout) => {
        try {
            setContextLoading(true)
            const { data } = await api.post('/Authentication/LogOut')
            toast.success(data.message)
            handleAuthorizeLogout()
            setUserToken(null);
            setUserData(null);
            clearApiAccessToken();

        } catch (error) {
            console.log(error)
        } finally {
            setContextLoading(false)
        }
    };

    const openAuthDialog = (mode, next = null) => {
        if (next) setNextPath(next);
        setAuthDialog({ open: true, mode });
    };
    const closeAuthDialog = () => {
        setAuthDialog({ open: false, mode: null });
        if (nextPath) setNextPath(null);
    };

    useEffect(() => {
        checkUserSession();
    }, []);
    useEffect(() => {
        console.log("Next Path changed:", nextPath);
    }, [nextPath]);
    const value = {
        userToken,
        userData,
        isAuthenticated: !!userToken,
        contextLoading,
        setContextLoading,
        login,
        logout,
        checkUserSession,
        authDialog,
        openAuthDialog,
        closeAuthDialog,
        setAuthDialog,
        nextPath,
        setNextPath,

    };


    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}