export const styles = (theme) => ({
    header: {
        width: "100%",
        mb: 3,
    },
    title: {
        fontFamily: '"Roboto", sans-serif',
        fontSize: "30px",
        textAlign: "center",
        fontWeight: 700,
        mb: 1,
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
        textAlign: "center",
        fontSize: "0.875rem",
        color: "#94a3b8",
    },
    signInButton: {
        color: "primary.main",
        fontWeight: 500,
        textTransform: "none",
        "&:hover": {
            color: theme.palette.mode === "dark" ? "#d32f2f" : "#2688f0",
        },
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