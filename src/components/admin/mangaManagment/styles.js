    export const styles =(isPhone)=> ({
        card: {
            cursor: 'pointer',
            background: 'transparent',
            position: "relative",
            maxWidth: { xs: 100, sm: 150, md: 230 },
            boxShadow: "none",
            transition: "0.3s",
            ...(isPhone
                ? {
                    "&:active .MuiTypography-root.title": {
                        color: "primary.main",
                    },
                    "&:active .MuiTypography-root.author": {
                        color: "text.primary",
                    },
                    "&:active .delete-btn": { opacity: 1 }, // 📱 على الموبايل يظهر بالضغط
                }
                : {
                    "&:hover .MuiTypography-root.title": {
                        color: "primary.main",
                    },
                    "&:hover .MuiTypography-root.author": {
                        color: "text.primary",
                    },
                    "&:hover .delete-btn": { opacity: 1 }, // 🖥️ على الكمبيوتر يظهر بالهوفر
                }),
        },
        cardAction: {
            transition: '0.3s',
            ...(isPhone ? {
                '&:active': {
                    filter: 'brightness(.6)',
                },
            } : {
                '&:hover': {
                    filter: 'brightness(.6)',
                },
            })
        },
        img: {
            ...(isPhone ? {
                '&:active': {
                    transform: "scale(1.02)",
                },
            } : {
                '&:hover': {
                    transform: "scale(1.02)",
                },
            }),

            transition: '.3s'

        },
        title: {
            fontFamily: '"Open Sans",sans-serif,Cairo',
            textAlign: 'center',
            fontSize: { xs: 12, sm: 18, md: 18 },
            fontWeight: 'bold'
        },
        author: {
            color: 'text.secondary', textAlign: 'center',
            fontSize: { xs: 10, sm: 13 }
        },

        Icon: {
            display: 'none',
            position: "absolute",
            top: 8,
            right: 8,
            opacity: 0, // مخفي افتراضياً
            transition: "opacity 0.2s ease",
            zIndex: 10,
        },
        deleteIcon: {

            bgcolor: "error.main",
            color: "error.contrastText",
            "&:hover": {
                bgcolor: "error.dark",
            },
            zIndex: 10,

        },
        EditIcon: {
            bgcolor: "info.main",
            color: "info.contrastText",
            "&:hover": {
                bgcolor: "info.dark",
            },
            zIndex: 10,

        },
        activateButton: {
            direction: "ltr",
            width: "100%",
            textTransform: "none",
            fontSize: 13,
            borderRadius: 3,
            px: 2,
            py: 0.5,
            fontWeight: 600,
            "&:hover": {
                transform: "scale(1.05)",
            },
        },
        categoryChip: {
            fontSize: { xs: 9, sm: 11 },
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': { bgcolor: 'primary.dark' },
        }
    })