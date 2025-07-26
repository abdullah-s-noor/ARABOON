import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Box } from '@mui/material';
import './style.css';
import { useTranslation } from 'react-i18next';
import { isMobile, isTablet } from 'react-device-detect'
import { useEffect, useState } from 'react';

const PromoBannerSwiper = () => {
  const [isPhone, setIsphone] = useState(false);

  useEffect(() => {
    const handlePhoneLayout = () => {
      setIsphone(isMobile || isTablet)
    }
    handlePhoneLayout()
  }, [])
  const { i18n } = useTranslation();
  const banners = [1, 2, 3, 4, 5];
  const imageStyle = {
    width: '100%',
    borderRadius: '10px',
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
      className="promo-banner-swiper"
    >
      {banners.map((n) => (
        <SwiperSlide key={n}>
          <Box
            component="img"
            src={`/image/promoBanner/${n}.jpg`}
            alt={`Promo ${n}`}
            sx={imageStyle}
            onClick={() => console.log(`Banner ${n} clicked`)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PromoBannerSwiper;
