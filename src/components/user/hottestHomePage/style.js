const style = (theme, i18n) => ({
    hottestSidebar: {
        display: { xs: 'none', md: 'block' },
        width: '29%',
        height: '2000px',
        color: '#fff',
        background:
            theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, rgba(220, 9, 20, 0.5), rgba(220, 9, 20, 0))'
                : '#0c70de',
        position: 'relative',
    },
    hottestTitle: {
        fontFamily: '"Open Sans",sans-serif,Cairo',
        fontSize: '29px',
        fontWeight: 'bold',
        textAlign: 'center',
        py: 3,
        background:
            theme.palette.mode === 'dark'
                ? 'linear-gradient(00deg, rgba(220, 9, 20, 0.5), rgba(220, 9, 20, 0))'
                : 'linear-gradient(00deg, rgba(12, 112, 222, 0.5), rgba(12, 112, 222, 0))',
    },
    hottestButton: {
        width: { md: 70, lg: 100 },
        position: 'absolute',
        top: 0,
        ...(i18n.language === 'en' ? {
            right: 0,
            borderTopLeftRadius: '15px !important',
            borderBottomLeftRadius: '15px !important',
        } : {
            left: 0,
            borderTopRightRadius: '15px !important',
            borderBottomRightRadius: '15px !important',
        }),
        borderRadius: 0,
        backgroundColor: '#ffd600',
        fontFamily: '"Roboto", sans-serif',
        fontSize: { md: '11px', lg: '14px' },
        textTransform: 'inherit',
        '&:hover': {
            transform: 'scale(.98)',
        },
    },
    cardWrapper: {
        p: 2,
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        position: 'relative',
        ":hover": {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
        }
    },

    medalWrapper: {
        position: "absolute",
        top: 0,
        ...(i18n.language === 'en' ? { left: 50, } : { right: 50 }),
        borderRadius: '50%',
        width: 30,
        height: 30,
        bgcolor: '#000'
    },

    cardTitle: {
        fontFamily: '"Open Sans",sans-serif,Cairo',
        color: '#eee',
        fontSize: '18px',
        fontWeight: 'bold',
    },

    cardSubtitle: {
        fontSize: '14px',
        color: '#bebebe',
        fontFamily: '"Roboto", sans-serif',
        fontOpticalSizing: 'auto',
        fontWeight: 400, // استبدل 400 بالقيمة التي تريدها
        textTransform: 'uppercase'


    },
})
export default style