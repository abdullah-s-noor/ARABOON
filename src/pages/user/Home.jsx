// Home.jsx
import { Box, Button, Typography, useTheme } from "@mui/material";
import PromoBannerSwiper from "../../components/user/promoBannerSwiper/PromoBannerSwiper ";
import MediaCardSwiper from "../../components/user/mediaCardSwiper/MediaCardSwiper";
import useIsPhone from "../../hooks/useIsPhone";
import HottestHomePage from "../../components/user/hottestHomePage/HottestHomePage";

const Home = () => {
    const count = [1, 2, 3];
    const theme = useTheme()
    const isPhone = useIsPhone()
    const styles = (theme) => ({
        container: {
            backgroundColor: 'background.default',
            p: 0,
            m: 0,
        },
        mediaCardWrapper: {
            width: { xs: '100%', md: '70%' },
            height: '2000px',
            p: '0px 20px',
            bgcolor: 'background.paper',
        },
        categoryTitle: {
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: 500,
            textAlign: 'left',
            fontSize: '35px',
        },
        viewAllText: {
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 400,
            fontFamily: '"Open Sans",sans-serif,Cairo',
            transition: 'color 0.3s ease, transform 0.3s ease',
            color: 'text.secondary',
            ...(
                isPhone ? {
                    ':active': {
                        color: 'primary.main',
                        transform: 'scale(1.05)',
                    }
                } : {

                    ':hover': {
                        color: 'primary.main',
                        transform: 'scale(1.05)',
                    }
                }
            ),
        },

    })
    const style = styles(theme)
    return (
        <Box sx={style.container}>
            <PromoBannerSwiper />
            <Box component={'div'} display={'flex'} sx={{ marginTop: ' 50px', justifyContent: 'space-between' }}>
                {/* media card */}
                <Box component={'div'} sx={style.mediaCardWrapper}>
                    {count.map((index, key) => (
                        <>
                            <Box key={index} component={'div'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                <Typography
                                    sx={style.categoryTitle}
                                >
                                    Drama
                                </Typography>
                                <Typography
                                    variant='body2'
                                    sx={style.viewAllText}
                                >
                                    View All
                                </Typography>
                            </Box>
                            <MediaCardSwiper />
                        </>
                    ))}
                </Box>
                {/* hottest sidebar for pc display */}
                <HottestHomePage />
            </Box>
        </Box >
    );

};

export default Home;
