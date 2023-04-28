import { React, useContext } from 'react';
import '../PopularBlock1/PopularBlock1.scss';

import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';

import 'swiper/scss';
import '../../../styles/swiperScrollBar.scss';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../AppProvider';
import { getRightData } from '../../../helpers/getrRightData';

import noImage from '../../../images/ProductForm/noPhoto.svg';



export const PopularBlock1 = () => {
  const navigate = useNavigate();
  const { productsApi } = useContext(AppContext);

  const { t, i18n } = useTranslation();

  const handleClick = () => {
    navigate('/categories');
  };

  return (
    <div className="popularBlock1">
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
        {productsApi.slice(0, 5).map(product => (
          <SwiperSlide key={product.id}>
            <img
              src={product.image || noImage}
              alt=""
              className="swiperBox1__img"
            />
            <p className="swiperBox1__title">
              {getRightData(product, i18n.language, 'title' )}
            </p>
            <p className="swiperBox1__price">{`$ ${product.price}.00` }</p>
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
