import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

// Import required modules
import { FreeMode, Navigation } from 'swiper/modules';

// Import your scoped CSS
import './styles.css';
import { Box, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Scale, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useIsPhone from '../../../hooks/usePhone';


export default function MediaCardSwiper({ mangas }) {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const { isPhone } = useIsPhone()
    const {t, i18n } = useTranslation();
    const imageStyle = {
        width: '100%',
        display: 'block',
    };
    const navigate = useNavigate()
    return (

        <>

            <Swiper
                key={i18n.dir()} //forces re-render when language direction changes
                dir={i18n.dir()}
                spaceBetween={10}
                freeMode={true}
                navigation={!isPhone && true}
                modules={[FreeMode, Navigation]}
                className="media-card-swiper "
                breakpoints={{
                    0: { slidesPerView: 3.2 },
                    600: { slidesPerView: 4.2 },
                    900: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 },
                }}

                style={{ marginBottom: 50 }}
            >
                {mangas.map((manga, index) => (
                    <SwiperSlide key={index} style={{ borderRadius: '10px' }}>
                        <Box
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                ...(!isPhone && {
                                    '&:hover .card-info': {
                                        bottom: 0
                                    }
                                })
                            }}
                        >
                            <Box
                                component="img"
                                src={manga.mangaImageUrl}
                                alt={`Promo ${index + 1}`}
                                sx={imageStyle}
                                onClick={() => {
                                    navigate(`/manga/${manga.mangaID}`)
                                }}
                            />

                            <Box
                                className="card-info"
                                sx={{
                                    position: 'absolute',
                                    bottom: '-50px',
                                    width: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white',
                                    py: 1,
                                    transition: 'bottom 0.3s ease',

                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: '"Open Sans",sans-serif,Cairo',
                                        fontSize: { xs: 10, sm: 12, md: 16 }
                                    }}
                                >
                                    {manga.mangaName}
                                </Typography>
                                <Divider sx={{ textAlign: 'center', my: 2, borderColor: '#bebebe', width: '100%' }} />
                                <Box sx={{
                                    display: 'flex', justifyContent: 'space-between'
                                    , color: '#bebebe',
                                }}>
                                    <Typography sx={{
                                        fontSize: { xs: 8, sm: 12, md: 16 }
                                    }}>{t("last_chapter")}:{manga.lastChapter.chapterNo} </Typography>

                                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.3, pr: 1, fontSize: { xs: 10, sm: 12, md: 16 } }}>
                                        <Visibility sx={{ fontSize: '1rem' }} />  {manga.lastChapter.views}
                                    </Typography>

                                </Box>
                            </Box>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
