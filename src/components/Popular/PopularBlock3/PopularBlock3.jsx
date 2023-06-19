import React, { useContext } from 'react';
import '../PopularBlock3/PopularBlock3.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import { useNavigate } from 'react-router-dom';

import '../../../styles/swiperScrollBar.scss';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../AppProvider';
import { getRightData } from '../../../helpers/getrRightData';

import noImage from '../../../images/ProductForm/noPhoto.svg';

export const PopularBlock3 = () => {
  const navigate = useNavigate();
  const { productsApi } = useContext(AppContext);

  const { t, i18n } = useTranslation();

  const handleClick = () => {
    navigate('/categories');
  };

  return (
    <div className="popularBlock3">
     
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          1: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1350: {
            slidesPerView: 4,
            spaceBetween: 80,
          },
        }}
        scrollbar={{
          hide: false,
        }}
        modules={[Scrollbar]}
      >
        {productsApi.reverse().slice(0, 6).map(product => (
          <SwiperSlide key={product.id}>
        
            <img
              src={product.image || noImage}
              alt=""
              className="swiperBox2__img"
            />
            <p className="swiperBox2__title">
              {getRightData(product, i18n.language, 'title' )}
            </p>
            <p className="swiperBox2__price">
              {`${product.price}.00 AZN` }
            </p>
  
          </SwiperSlide>
        ))}
      </Swiper>
      <button 
        className="allProducts-button popularBlock-button"
        onClick={handleClick}
      >
        <span>{t('wholeRange')}</span>
        <p>&#10095;</p>
      </button>
    </div>
  
  );
};
