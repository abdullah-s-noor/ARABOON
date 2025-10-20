import React from 'react'
import { useState, useRef, useEffect, useContext } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AccountCircle, Brightness4, Brightness7, Logout, PersonAdd } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import styles from "./style";
import SelectLanguage from "../../../../common/SelectLanguage";
import { ThemeModeContext } from "../../../../../context/darkMode";
import useIsPhone from "../../../../../hooks/usePhone";
import { Link, useNavigate } from "react-router-dom";
import { AuthDialog } from "../../../../../pages/auth/AuthDialog";
import { UserContext } from "../../../../../context/UserContext";
import MyAvatar from "../../../../common/MyAvatar";
function NavbarActions({language,setLanguage}) {
    const navigate = useNavigate()
    const theme = useTheme()
    const { isPhone } = useIsPhone()
    const style = styles(theme, isPhone)
    const { toggleDarkMode, darkMode } = useContext(ThemeModeContext)
    const [openAuthDialog, setOpenAuthDialog] = useState({
        open: false,
        mode: null,
    })
    const { userToken,userData } = useContext(UserContext)
    const mdUp = useMediaQuery(theme.breakpoints.up("md"));
    const Search = () => (
        <Box sx={style.menuIcons} onClick={() => { navigate('/search') }}>
            <SearchIcon sx={{ color: "#ccc" }} fontSize="medium" />
        </Box>
    )
    return (
        <>
            <AuthDialog openAuthDialog={openAuthDialog} onOpenChange={setOpenAuthDialog} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {mdUp ?
                    <>
                        <SelectLanguage
                            language={language}
                            setLanguage={setLanguage}
                        />
                        {/* Light&Dark Mode */}
                        <Box
                            sx={style.menuIcons}
                            onClick={() => {
                                toggleDarkMode()
                            }}
                        >
                            {darkMode ?
                                <Brightness7 sx={{ color: 'orange' }} fontSize="medium" />
                                :
                                <Brightness4 sx={{ color: 'white' }} fontSize="medium" />}
                        </Box>
                        {/* Search Icon Only */}
                        <Search />

                        {userToken ?
                            (userData && <MyAvatar />) :
                            // login
                            <Box sx={style.menuIcons} onClick={() => { setOpenAuthDialog({ open: true, mode: "register" }) }}>
                                <AccountCircle sx={{ color: "#ccc" }} fontSize="medium" />
                            </Box>
                        }
                    </> :
                    /* Search Icon Only */
                    <Search />
                }

            </Box>
        </>

    )
}

export default NavbarActions
