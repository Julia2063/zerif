import { React } from 'react';
import '../Main/Main.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export const Main = () => {

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/categories');
  };

  return (
    <div className="main">
      <div className="main__swiper"> 
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          autoplay= {{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
         
      
        
          modules={[Pagination, Autoplay]}
        
        >
       
          <SwiperSlide>
            <img
              src={require('../../../images/HomePage/headerDescBgrnd.png')}
              alt=""
              className="swiper__img"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={require('../../../images/HomePage/headerDescBgrnd.png')}
              alt=""
              className="swiper__img"
            />
          </SwiperSlide>
        
        </Swiper>
      </div>
      
      <div className="main__block">
        <h3 className="h3">Lorem ipsum <br />Dolor sit amet</h3>
        <p className="p">
            Lorem ipsum dolor sit amet, Consectetur adipiscing elit Sed do
            eiusmod tempor
        </p>
        <button 
          className="order-button"
          onClick={handleClick}
        >
          {t('orderButton')}
        </button>
      </div>
    </div>
  );
};
