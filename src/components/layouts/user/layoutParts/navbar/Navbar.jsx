import { useState, } from "react";
import {AppBar,Toolbar,useTheme,useMediaQuery} from "@mui/material";
import Sidebar from "./Sidebar";
import { useTranslation } from "react-i18next";
import styles from "./style";
import useIsPhone from "../../../../../hooks/usePhone";
import Logo from "./Logo";
import NavbarActions from "./NavbarActions";
import NavbarMenu from "./NavbarMenu";

export default function Navbar() {
  const theme = useTheme()
  const { isPhone } = useIsPhone()
  const style = styles(theme, isPhone)
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language?.toUpperCase() || "EN");

  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      <AppBar navbar-name="main-nav" position="static" sx={style.appBar}>
        <Toolbar sx={style.toolbar}>
          {/* Logo */}
          {mdUp ? (<Logo />) : <Sidebar language={language} setLanguage={setLanguage} />}
          <NavbarMenu />
        <NavbarActions language={language} setLanguage={setLanguage}/>
        </Toolbar>
      </AppBar >
    </>
  );
}