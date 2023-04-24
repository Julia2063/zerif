import React from 'react';
import '../Body2/Body2.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useNavigate } from 'react-router-dom';
import { body2Api } from '../../../API/Body2API';


export const Body2 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/categories');
  };

  return (
    <div className="body2">
      <p className="body2__title1">Рекомендуем</p>
      <p className="body2__title2">Торты на любой вкус</p>

      
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
          
          {body2Api.map((product) => (
            <SwiperSlide key={product.id}  >
              <div className="body2__slider-card">
                <img
                  src={require(`../../../images/HomePage/body2/${product.id}.png`)}
                  alt=""
                />
                <p className="body2__slider-title">{product.title}</p>
                <p className="body2__slider-description">{product.description}</p> 
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
          <p className="container2--mobile-title">{body2Api[0].title}</p>
          <p className="container2--mobile-description">{body2Api[0].description}</p>
        </div>
      </div>
     
        

      <button 
        className="allProducts-button"
        onClick={handleClick}
      >
        <span>Весь ассортимент</span>
        <p>&#10095;</p>
      </button>
    </div>
  );
};
