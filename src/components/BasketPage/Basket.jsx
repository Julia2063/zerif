import React from 'react';
import '../BasketPage/Basket.scss';
import { Link } from 'react-router-dom';

export const Basket = () => {
  return (
    <div className="basket">
      <h1 className="basket__title">Корзина</h1>
      <div className="basketBox">
        <div className="basketBlock1">
          <div className="basketBlock1__item">
            <div className="imgBlock">
              <img
                src={require('../../images/BasketPage/productImage.png')}
                alt="product image1"
                className="basketBlock1__img"
              />
            </div>
            <div className="basketBlock1__title">
              <p>Торт с ягодами</p>
        
              <div className="basketBlock1__counterBox">
                <button className="basketBlock1__counterButton"> - </button>
                <p className="basketBlock1__counterText">2</p>
                <button className="basketBlock1__counterButton"> + </button>
              </div>
            </div>
            
         
            <div className="basketBlock1__price">
              <p>50$</p>
           
            </div>
            <button className="basketBlock1__deleteButton">
              <img
                src={require('../../images/BasketPage/closeIcon.png')}
                alt=""
              
              />
            </button>
          </div>
          
        </div>
        <div className="basketBlock2">
          <div className="basketBlock2__productPrice">
            <p>Товар:</p>
            <p>100$</p>
          </div>
          <div className="basketBlock2__delivery">
            <p>Доставка:</p>
            <p>По тарифам перевозчика</p>
          </div>
          <div className="basketBlock2__fullCoast">
            <p>Всего:</p>
            <p>100$</p>
          </div>
        </div>
      </div>
      <button 
        className="basket__button"> 
        <Link to={'/basket/order'} className="helperLink">
          Оформить заказ 
        </Link>
      </button>
    </div>
  );
};
