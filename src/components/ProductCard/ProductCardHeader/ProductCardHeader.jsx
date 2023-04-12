import React, { useState } from 'react';
import '../ProductCardHeader/ProductCardHeader.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import { Link } from 'react-router-dom';

import success from '../../../images/BasketPage/success.svg';

import 'swiper/scss';

import '../../../styles/swiperScrollBar.scss';


export const ProductCardHeader = () => {
  const [isProductAdd, setIsProductAdd] = useState(false);

  const handleAdd = () => {
    setIsProductAdd(true); 
    setTimeout(() => {
      setIsProductAdd(false);
    }, 3000);
  };

  return (
    <div className="productCardHeader">
        
      <p className="productCardHeader__title">Товары / десерты</p>
      <div className="desktopDisplay">
        <div className="desktopDisplay__photoZone">
          <Swiper
            className="desktopDisplay__photoZone-img"
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            scrollbar={{
              hide: false,
            }}
            modules={[Scrollbar]}
          >
            <SwiperSlide className="swiper__img">
              <img
                src={require('../../../images/ProductCard/productCardPhoto.png')}
                alt=""
                
              />
            </SwiperSlide>
            <SwiperSlide  className="swiper__img">
              <img
                src={require('../../../images/ProductCard/productCardPhoto.png')}
                alt=""
               
              />
            </SwiperSlide>
          </Swiper>
          <img
            src={require('../../../images/ProductCard/sideImg1.png')}
            alt="small pie imag1"
            className="desktopDisplay__photoZone-sideImg1"
          />
          <img
            src={require('../../../images/ProductCard/sideImg2.png')}
            alt="small pie image2"
            className="desktopDisplay__photoZone-sideImg2"
          />
          <img
            src={require('../../../images/ProductCard/sideImg3.png')}
            alt="small pie image3"
            className="desktopDisplay__photoZone-sideImg3"
          />
          <img
            src={require('../../../images/ProductCard/sideImg4.png')}
            alt="small pie image4"
            className="desktopDisplay__photoZone-sideImg4"
          />
        </div>
        <img
          src={require('../../../images/ProductCard/productCardPhoto.png')}
          alt="small pie image5"
          className="desktopDisplay__photo-mobile"
        />
        <div>
          <p className="productCardHeader__title2">Торт с ягодами</p>
          <p className="productCardHeader__price">Цена - 50,00 $ </p>
          <p className="productCardHeader__descriptionTitle">Описание:</p>
          <p className="productCardHeader__description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
                eiusmod tempor
          </p>
          <p className="productCardHeader__weight">
            <b>Вес</b> - 2 кг
          </p>
          <p className="productCardHeader__taste">
            <b>Вкус</b> - воздушный бисквит с шоколадной крошкой и нежными
                ягодными нотками
          </p>
          <div className="productCardHeader__basketButtons">
            <button 
              className="productCardHeader__basketButton"
              onClick={handleAdd}
            >
              Добавить в корзину
            </button>
            <div className="counterBox">
              <button className="productCardHeader__counterButton">
                    -
              </button>
              <p className="productCardHeader__counterTitle">1</p>
              <button className="productCardHeader__counterButton">
                    +
              </button>
            </div>
          </div>
        </div>
      </div>

      {isProductAdd && (
        <div className="productCardHeader__notification">
          <img src={success} alt="success" />
          <div className="productCardHeader__notification-content">
            <p>Товар добавлен в корзину</p>
            <Link to="/basket">
              Перейти в корзину
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
