import { yellow } from "@mui/material/colors";

const style = {
    appBar: { 
        //put background image here and make the navbar transparent
        backgroundImage: "url('/image/bgimage/4.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#111", borderTop: "6px solid #b71c1c", boxShadow: "none", },
    toolbar: { justifyContent: "space-between", px: 3, position: "relative" },
    yellowBar: {
        position: "absolute",
        top: -6,
        height: 6,
        backgroundColor: "rgba(255, 214, 0, 0.7)", // اللون الأصفر مع شفافية 50%
        transition: "transform 0.3s ease, opacity 0.3s ease, left 0.4s ease, width 0.2s ease",
    },
    menuItems: {
        fontFamily: 'system-ui',
        textTransform: "uppercase",
        fontWeight: 400,
        fontSize: 15,
        letterSpacing: 1,
        cursor: "pointer",
        color: "#eee",
        px: 1.5,
        transition: "color 0.4s",
        "&:hover": { color: "#ffd600" },
    },
    language: {
        backgroundColor: "#b71c1c",
        color: "#fff",
        fontWeight: 600,
        fontSize: 13,
        height: 33,
        minWidth: 70,
        borderRadius: "20px",
        ".MuiSelect-icon": { color: "#fff" },
        ".MuiOutlinedInput-notchedOutline": {
            border: "none",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
        },
    },
    menuIcons: {
        width: 33,
        height: 33,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        backgroundColor: "#222",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#333",
        },
    },
    sidebar: {
        width: 240,
        background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.95), rgba(183, 28, 28, 0.85))",
        height: "100vh",
    },
    sidebarP1: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1,
    },
    sidebarP2:{
        
    }
};
export default style;