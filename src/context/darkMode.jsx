import { createContext, useEffect, useState } from "react";

// @ts-ignore
export const ThemeModeContext = createContext();

export default function ThemeModeContextProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('mode');
        return saved === null ? true : saved === 'true';
    });

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        // @ts-ignore
        localStorage.setItem('mode', newMode);
        setDarkMode(newMode);
    };


    return (
        <ThemeModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeModeContext.Provider>
    );
}
