
const style = (theme, isPhone) => ({
    appBar: {
        //put background image here and make the navbar transparent
        backgroundImage: "url('/image/bgimage/4.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#111", borderTop: `6px solid ${theme.palette.primary.main}`, boxShadow: "none",
        zIndex: 10,
    },
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
        ...(isPhone ? {
            "&:active": { color: "#ffd600" },
        } : {
            "&:hover": { color: "#ffd600" },
        }),
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
        ...(isPhone ? {
            "&:active": {
                backgroundColor: "#333",
            },
        } : {
            "&:hover": {
                backgroundColor: "#333",
            },
        })
    },
    sidebar: {
        width: 240,
        background: theme.palette.mode === 'dark' ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.95), rgba(183, 28, 28, 0.85))"
            : "linear-gradient(to bottom,rgba(12, 112, 222, 0.85), rgba(12, 112, 222, 0.85))"
        ,
        height: "100vh",
    },
    sidebarP1: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1,
    },
    sidebarP2: {

    }
});
export default style;