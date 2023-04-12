import { React } from 'react';
import '../PopularBlock1/PopularBlock1.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import { body1Api } from '../../../API/Body1API';

import 'swiper/scss';
import '../../../styles/swiperScrollBar.scss';


export const PopularBlock1 = () => {
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
        {body1Api.map((product) => (
          <SwiperSlide key={product.id}>
            <img
              src={require(`../../../images/Popular/Pagination/${product.id}.png`)}
              alt=""
              className="swiperBox1__img"
            />
            <p className="swiperBox1__title">{product.title}</p>
            <p className="swiperBox1__price">{product.price}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="allProducts-button popularBlock-button">
        <span>Весь ассортимент</span>
        <p>&#10095;</p>
      </button>
    </div>
  );
};
