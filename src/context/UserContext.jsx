// src/contexts/UserContext.jsx

import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { api, setApiAccessToken, clearApiAccessToken } from "../services/api";
import { toast } from "react-toastify";

// @ts-ignore
export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [contextLoading, setContextLoading] = useState(true);
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
    };

    const logout = async () => {
        try {
            setContextLoading(true)
            const { data } = await api.post('/Authentication/LogOut')
            toast.success(data.message)
            setUserToken(null);
            setUserData(null);
            clearApiAccessToken();

        } catch (error) {
            console.log(error)
        } finally {
            setContextLoading(false)
        }
    };

    useEffect(() => {
        checkUserSession();
    }, []);

    useEffect(() => {
        if (userToken) {
            decodeUserData(userToken);
            setApiAccessToken(userToken);
        }
    }, [userToken]);

    const value = {
        userToken,
        userData,
        isAuthenticated: !!userToken,
        contextLoading,
        setContextLoading,
        login,
        logout,
        checkUserSession,
    };


    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}