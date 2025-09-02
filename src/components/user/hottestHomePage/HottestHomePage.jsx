import { Box, Button, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next';
import styles from './style'
function HottestHomeCard({hottestMangas}) {
    const theme = useTheme();
    const { i18n,t } = useTranslation()
    const style=styles(theme,i18n)
    return (
        <Box component={'div'}
            sx={style.hottestSidebar}>
            <Typography
                sx={style.hottestTitle}
            >
                {t("hottest")}
            </Typography>

            <Button
                sx={style.hottestButton}
            >
                {t("view_all")}
            </Button>
            {hottestMangas.map((manga,index) => (
                <Box key={index} component={'div'} sx={style.cardWrapper}>
                    <Box
                        sx={style.medalWrapper}
                    >
                        {[1, 2, 3].includes(index+1) ? (
                            <Box
                                component={'img'}
                                src={`/image/medal/${index+1}.svg`}
                                sx={{
                                    width: '100%',
                                    margin: 'auto',
                                }}
                            />
                        ) : (
                            <Typography sx={{ textAlign: 'center', fontSize: '1.3rem' }}>{index+1}</Typography>
                        )}

                    </Box>
                    <Box
                        component="img"
                        src={manga.mangaImageUrl}
                        alt={`Promo `}
                        sx={{
                            width: '100px'
                        }}
                    // onClick={() => console.log(`Banner ${n} clicked`)}
                    />
                    <Box >{/* subtitle */}
                        <Typography
                            sx={style.cardTitle}
                        >
                            {manga.mangaName}
                        </Typography>
                        <Typography
                            sx={style.cardSubtitle}
                        >
                            {manga.authorName}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, }}>
                            <Box
                                component={'img'}
                                src='/image/hottest/1.svg'
                                sx={{
                                    width: 15,
                                    display: 'block'
                                }}
                            />
                            {manga.popularityScore}
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default HottestHomeCard
