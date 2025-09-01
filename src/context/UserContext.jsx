import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "../services/api";

// @ts-ignore
export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [userToken, setUserToken] = useState(
        localStorage.getItem("userToken") || null
    );
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {

        if (userToken) {
            getUserData();
        } else {
            localStorage.removeItem("userToken")
            setUserData(null)
        }
    }, [userToken]);

    const getUserData = async () => {
        try {
            const decoded = jwtDecode(userToken);
            console.log(decoded)
            setUserData(decoded);
        } catch (error) {
            console.error("Invalid token:", error);
            setUserData(null);
        }
    };
    const logout = () => {
        setUserToken(null)
        localStorage.removeItem("userToken")
        setUserData(null)
    }

    return (
        <UserContext.Provider value={{ userToken, setUserToken, userData, logout }}>
            {children}
        </UserContext.Provider>
    );
}
