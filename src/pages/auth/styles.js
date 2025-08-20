import { Palette } from "lucide-react";

export const styles = (theme) => ({
    dialogPaper: {
        border: theme.palette.mode==='dark'?"1px solid rgba(183, 28, 28, 0.30)":"1px solid rgba(12, 112, 122, 0.30)",
        borderRadius: 2,
        overflow: "hidden",
        maxWidth: "90rem",
        width: "900px",
        maxHeight: "100vh",
        m: 0,
        p: 0,
    },
    dialogContent: {
        p: 0,
        bgcolor: "secondary.main",
        display: "flex",
    },
    leftSide: {

        '@media (min-width:750px)': {
            display: 'flex',
            width: '50%'
        },
        display: { xs: "none" },   // hidden md:flex
        position: "relative",
        background:theme.palette.mode==='dark'?
        ( "linear-gradient(to bottom right, rgba(183, 28, 28, 0.50), #191919)"):
        ( "linear-gradient(to bottom right, rgba(12, 112, 222, 0.50), #d7dad8)"), // gradient bg
        alignItems: "center",
        justifyContent: "center",
    },
    overlayGradient: {
        position: "absolute",
        inset: 0,
        background: theme.palette.mode==='dark'?"linear-gradient(to right, transparent, rgba(25,25,25,0.8))":
        "linear-gradient(to right, transparent, rgba(215, 218, 216, 0.4))",
    },
    bgImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
    },
    bottomTextContainer: {
        position: "absolute",
        bottom: 30,
        left: 8,
        right: 8,
        textAlign: "center",
    },
    bottomTextInner: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        color: "primary.main",
        mb: 2,
    },
    topTypography: {
        fontSize: "0.875rem", // text-sm
        fontWeight: 500,      // font-medium
        color: "primary.main",
        transition: "color 0.3s",
        "&:hover": { color: "primary.main" },

    },
    bottomTypography: {
        color: "rgba(255,255,255,0.8)",
        fontSize: "0.875rem",
    },
    rightSide: { '@media (min-width:750px)': { width: '50%' }, width: { xs: "100%" }, display: 'flex', flexDirection: 'column', padding: '30px', justifyContent: 'center' }
})