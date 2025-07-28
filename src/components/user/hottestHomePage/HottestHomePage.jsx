import { Box, Button, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next';
import styles from './style'
function HottestHomeCard() {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const theme = useTheme();
    const { i18n } = useTranslation()
    const style=styles(theme,i18n)
    return (
        <Box component={'div'}
            sx={style.hottestSidebar}>
            <Typography
                sx={style.hottestTitle}
            >
                Hottest
            </Typography>

            <Button
                sx={style.hottestButton}
            >
                View All
            </Button>
            {cards.map((n) => (
                <Box key={n} component={'div'} sx={style.cardWrapper}>
                    <Box
                        sx={style.medalWrapper}
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
                            <Typography sx={{ textAlign: 'center', fontSize: '1.3rem' }}>{n}</Typography>
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
                            sx={style.cardTitle}
                        >
                            The Creepy and Freaky
                        </Typography>
                        <Typography
                            sx={style.cardSubtitle}
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
    )
}

export default HottestHomeCard
