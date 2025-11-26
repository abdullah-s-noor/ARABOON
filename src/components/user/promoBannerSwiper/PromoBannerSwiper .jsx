import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Box, useTheme } from '@mui/material';
import './style.css';
import { useTranslation } from 'react-i18next';
import useIsPhone from '../../../hooks/usePhone';
import { useNavigate } from 'react-router-dom';

const PromoBannerSwiper = ({ banners }) => {
  const { isPhone } = useIsPhone()
  const navigate = useNavigate()
  const { i18n } = useTranslation();
  const theme = useTheme()
  const imageStyle = {
    width: '100%',
    borderRadius: '10px',
    cursor:"pointer",
    ...(isPhone ? {
      ':active': {
        transform: 'scale(1.05)',
      }
    } :
      {
        ':hover': {
          transform: 'scale(1.05)',
        }
      }),
    transition: 'transform 0.3s ease',
  };
  return (
    <Swiper
      key={i18n.dir()} //forces re-render when language direction changes
      dir={i18n.dir()}
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      spaceBetween={30}
      breakpoints={{
        0: { slidesPerView: 1 },
        900: { slidesPerView: 2 },
      }}
      style={{ padding: '20px 20px 30px 20px' }}
      className={`promo-banner-swiper ${theme.palette.mode === 'dark' ? 'dark' : 'light'} lang-${i18n.language}`}

    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <Box
            component="img"
            src={banner.url}
            alt={`Promo ${banner.id}`}
            sx={imageStyle}
            onClick={() => {
              if (banner.link.startsWith("https://araboon.vercel.app/manga/")) {
                const mangaId = banner.link.split("/manga/")[1];
                navigate(`/manga/${mangaId}`);
              } else {
                window.open(banner.link, "_blank");
              }
            }}
          />

        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PromoBannerSwiper;
