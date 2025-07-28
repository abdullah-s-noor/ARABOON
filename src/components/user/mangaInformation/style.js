const style = (theme, i18n) => ({
        container: {
            mb: 2,
            display: 'flex',
            gap: 5,
            '@media (max-width:750px)': {
                flexDirection: 'column'
            },
        },

        mangaImage: {
            display: 'block',
            maxWidth: { xs: 290, sm: 300 },
            margin: 'auto'
        },

        infoSection: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, md: 4 }
        },

        headerBar: {
            background: i18n.language === "en" ?
                (theme.palette.mode === 'dark' ? 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(220,9,20,0))') :
                (theme.palette.mode === 'dark' ? 'linear-gradient(270deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(270deg, rgba(255,255,255,0.5), rgba(220,9,20,0))'),
            padding: '20px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap'
        },

        title: {
            fontFamily: '"Open Sans",sans-serif,Cairo',
            color: 'text.primary',
            fontSize: { xs: '25px', md: '28px' },
            fontWeight: 'bold',
        },

        subtitle: {
            fontSize: '14px',
            color: 'text.secondary',
            fontFamily: '"Roboto", sans-serif',
            fontOpticalSizing: 'auto',
            fontWeight: 400,
            textTransform: 'uppercase',
        },

        ratingSection: {
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            p: 0,
            m: 0,
        },

        infoGrid: {
            display: 'flex',
            gap: 5,
            color: 'text.secondary'
        },

        descriptionTitle: {
            fontFamily: '"Roboto", sans-serif',
            fontSize: '20px',
            fontWeight: 'bold',
        },

        descriptionText: {
            fontFamily: '"Roboto", sans-serif',
            fontSize: { xs: '14px', md: '18px' }
        },

    })
    export default style