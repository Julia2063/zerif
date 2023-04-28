import React from 'react';
import '../Body2/Body2.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { body2Api } from '../../../API/Body2API';
import { getRightData } from '../../../helpers/getrRightData';


export const Body2 = () => {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const handleClick = () => {
    navigate('/categories');
  };

  return (
    <div className="body2">
      <p className="body2__title1">{t('homePage.recommended')}</p>
      <p className="body2__title2">{t('homePage.allTastes')}</p>

      
      <div className="container2">
        <Swiper
          slidesPerView={3}
          spaceBetween={80}
          breakpoints={{
            1: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 90,
            },
          }}
          navigation
          modules={[Navigation]}
          className="body2__slider"
        >
          
          {body2Api.map(product => (
            <SwiperSlide key={product.id}  >
              <div className="body2__slider-card">
                <img
                  src={require(`../../../images/HomePage/body2/${product.id}.png`)}
                  alt=""
                />
                <p className="body2__slider-title">
                  {getRightData(product, i18n.language, 'title')}
                </p>
                <p className="body2__slider-description">
                  {getRightData(product, i18n.language, 'description')}
                </p> 
              </div>
             
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
     
        

      <div className="container2--mobile">
        <div className="container2--mobile-card">
          <img
            src={require(`../../../images/HomePage/body2/${body2Api[0].id}.png`)}
            alt="card photo1"
            className="container2--mobile-photo"
          />
          <p className="container2--mobile-title">
            {getRightData(body2Api[0], i18n.language, 'title')}
          </p>
          <p className="container2--mobile-description">
            {getRightData(body2Api[0], i18n.language, 'description')}
          </p>
        </div>
      </div>
     
        

      <button 
        className="allProducts-button"
        onClick={handleClick}
      >
        <span>{t('wholeRange')}</span>
        <p>&#10095;</p>
      </button>
    </div>
  );
};
