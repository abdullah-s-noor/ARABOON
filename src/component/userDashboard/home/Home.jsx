// Home.jsx
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import PromoBannerSwiper from "../promoBannerSwiper/PromoBannerSwiper ";
import MediaCardSwiper from "../mediaCardSwiper/MediaCardSwiper";
import { Visibility } from "@mui/icons-material";

const Home = () => {
    const count = [1, 2, 3];
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <Box sx={{ backgroundColor: '#191919', p: 0, m: 0 }}>
            <PromoBannerSwiper />
            <Box component={'div'} display={'flex'} sx={{ marginTop: ' 50px', justifyContent: 'space-between' }}>
                {/* media card */}
                <Box component={'div'} sx={{ width: { xs: '100%', md: '70%' }, height: '2000px', color: '#fff', p: '0px 20px', bgcolor: '#000000' }}>
                    {count.map((index, key) => (
                        <>
                            <Box key={index} component={'div'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                <Typography
                                    sx={{
                                        fontFamily: '"Open Sans", sans-serif',
                                        fontWeight: 500,
                                        textAlign: 'left',
                                        fontSize: '35px',
                                    }}
                                >
                                    Drama
                                </Typography>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                        fontWeight: 400,
                                        fontFamily: '"Open Sans",sans-serif,Cairo',
                                        transition: 'color 0.3s ease, transform 0.3s ease',
                                        color: '#666666',
                                        ':hover': {
                                            color: '#ffd600',
                                            transform: 'scale(1.05)',
                                        }
                                    }}
                                >
                                    View All
                                </Typography>
                            </Box>
                            <MediaCardSwiper />
                        </>
                    ))}
                </Box>
                {/* hottest sidebar for pc display */}
                <Box component={'div'} sx={{ display: { xs: 'none', md: 'block' }, width: '29%', height: '2000px', color: '#fff', background: 'linear-gradient(180deg, rgba(220, 9, 20, 0.5), rgba(220, 9, 20, 0))', position: 'relative' }}>

                    <Typography
                        sx={{
                            fontFamily: '"Open Sans",sans-serif,Cairo',
                            fontSize: '29px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            py: 3,
                            background: 'linear-gradient(00deg, rgba(220, 9, 20, 0.5), rgba(220, 9, 20, 0))',


                        }}
                    >
                        Hottest
                    </Typography>

                    <Button
                        sx={{
                            width: 100,
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            backgroundColor: '#ffd600',
                            color: '#000',
                            borderRadius: 0,
                            borderTopLeftRadius: '15px',
                            borderBottomLeftRadius: '15px',
                            fontFamily: '"Roboto", sans-serif',
                            textTransform: 'inherit',
                            '&:hover': {
                                transform: 'scale(.98)',
                                right: '0'
                            },
                        }}
                    >
                        View All
                    </Button>


                    {cards.map((n) => (
                        <Box key={n} component={'div'} sx={{
                            p: 2, display: 'flex', gap: 2, alignItems: 'center', position: 'relative',
                            ":hover": {
                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                            }
                        }}>
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0, left: 50,
                                    borderRadius: '50%',
                                    width: 30,
                                    height: 30,
                                    bgcolor: '#191919'
                                }}
                            >
                                {[1, 2, 3].includes(n) ? (
                                    <Box
                                        component={'img'}
                                        src={`/image/medal/${n}.svg`}
                                        sx={{
                                            width: '100%',
                                            margin: 'auto',
                                        }}
                                    />
                                ) : (
                                    <Typography sx={{textAlign:'center',fontSize:'1.3rem'}}>{n}</Typography>
                                )}

                            </Box>
                            <Box
                                component="img"
                                src={`/image/mediaCard/${n}.jpg`}
                                alt={`Promo `}
                                sx={{
                                    width: '100px'
                                }}
                            // onClick={() => console.log(`Banner ${n} clicked`)}
                            />
                            <Box >{/* subtitle */}
                                <Typography
                                    sx={{
                                        fontFamily: '"Open Sans",sans-serif,Cairo',
                                        color: '#eee',
                                        fontSize: '18px',
                                        fontWeight: 'bold',

                                    }}
                                >
                                    The Creepy and Freaky
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        color: '#bebebe',
                                        fontFamily: '"Roboto", sans-serif',
                                        fontOpticalSizing: 'auto',
                                        fontWeight: 400, // استبدل 400 بالقيمة التي تريدها
                                        textTransform: 'uppercase'


                                    }}
                                >
                                    Masashi Kishimoto / Mikio Ikemoto
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, pr: 1, }}>
                                    <Box
                                        component={'img'}
                                        src='/image/hottest/1.svg'
                                        sx={{
                                            width: 15,
                                            display: 'block'

                                        }}


                                    />
                                    1000
                                </Box>

                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box >
    );
};

export default Home;
