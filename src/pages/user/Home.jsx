// Home.jsx
import { Box, Button, Typography, useTheme } from "@mui/material";
import PromoBannerSwiper from "../../components/user/promoBannerSwiper/PromoBannerSwiper ";
import MediaCardSwiper from "../../components/user/mediaCardSwiper/MediaCardSwiper";
import useIsPhone from "../../hooks/usePhone";
import HottestHomePage from "../../components/user/hottestHomePage/HottestHomePage";
import { Fragment, useEffect, useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LogoLoader from "../../components/common/LogoLoader";

const Home = () => {
    const count = [1, 2, 3];
    const navigate = useNavigate()
    const theme = useTheme()
    const { i18n, t } = useTranslation()
    const { isPhone } = useIsPhone()
    const [loading, setLoading] = useState(true)
    const [categoriesMangas, setCategoriesMangas] = useState(null)
    const [hottestMangas, setHottestMangas] = useState([])
    const styles = (theme) => ({
        container: {
            backgroundColor: 'background.default',
            p: 0,
            m: 0,
        },
        mediaCardWrapper: {
            width: { xs: '100%', md: '70%' },
            height: "auto",
            p: '0px 20px',
            bgcolor: 'background.paper',
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
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
    useEffect(() => {
        const fetchAllHomePageMangas = async () => {
            try {
                setLoading(true);
                const [categoriesData, hottestData] = await Promise.all([
                    api.get("/Manga/GetCategoriesHomePageMangas"),
                    api.get("/Manga/GetHottestMangas"),
                ]);
                setHottestMangas(hottestData.data.data)
                setCategoriesMangas((categoriesData.data.data))
                console.log("Categories:", categoriesData.data.data);
                console.log("Hottest Mangas:", hottestData.data.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllHomePageMangas();
    }, [i18n.language]);
    const capitalizeFirst = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <>
            {
                loading ?  <LogoLoader />:
                    <Box sx={style.container}>
                       
                        <PromoBannerSwiper />
                        <Box component={'div'} display={'flex'} sx={{ marginTop: ' 50px', justifyContent: 'space-between' }}>
                            {/* media card */}
                            <Box component={'div'} sx={style.mediaCardWrapper}>
                                {categoriesMangas?.map((category, index) => (
                                    <Fragment key={index}>
                                        <Box component={'div'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                            <Typography sx={style.categoryTitle}>
                                                {capitalizeFirst(category?.category?.[i18n.language])}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                sx={style.viewAllText}
                                                onClick={() => { navigate(`/viewall`, { state: { categoryName: category?.category } }) }}
                                            >
                                                {t("view_all")}
                                            </Typography>
                                        </Box>
                                        <MediaCardSwiper mangas={category.mangas} />
                                    </Fragment>
                                ))}
                            </Box>
                            {/* hottest sidebar for pc display */}
                            <HottestHomePage hottestMangas={hottestMangas} />
                        </Box>
                    </Box >
            }

        </>

    );

};

export default Home;
