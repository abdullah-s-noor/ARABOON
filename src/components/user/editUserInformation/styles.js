import { ArrowBack } from "@mui/icons-material";

export const styles = (theme) => ({
    container: {
        maxWidth: "1200px",
        bgcolor: theme.palette.mode==='dark'?"#000 !important":"#fff !important",
        margin: "auto",
        borderRadius: "20px",
        p: 5, // padding داخلي
        boxShadow: 3, // ظل خفيف
        background: 'linear-gradient(rgba(255, 255, 255, 0.051), rgba(255, 255, 255, 0.051))'

    },
    header: {
        width: "100%",
        mb: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontFamily: '"Roboto", sans-serif',
        fontSize: { xs: "20px", sm: "30px" },
        fontWeight: 700,
    },
    subtitle: {
        color: "text.secondary",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    errorAlert: {
        mb: 2,
        bgcolor: "#FFE9D5",
        color: "#7A0916",
        width: "100%",
    },
    bottomText: {
        mt: 1,
        textAlign: "center",
        fontSize: "0.875rem",
        color: "#94a3b8",
    },
    submitButton: {
        width: "100%",
        bgcolor: "primary.main",
        color: "#fff",
        fontSize: "15px",
        fontFamily: '"Roboto", sans-serif',
        boxShadow: theme.palette.mode === 'dark' ? "0 4px 6px rgba(183,28,28,0.3)" : "0 4px 6px rgba(12,112,222,0.3)",
        "&:hover": { bgcolor: theme.palette.mode === 'dark' ? "#d32f2f" : "#2688f0" },
        transition: "all 0.3s",
        textTransform: "none",
    },

});