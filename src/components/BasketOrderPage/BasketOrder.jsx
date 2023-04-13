import React, { useState } from 'react';
import '../BasketOrderPage/BasketOrder.scss';
import '../BasketPage/Basket.scss';

import success from '../../images/BasketPage/success.svg';



export const BasketOrder = () => {

  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsOrderSuccess(true);
    setTimeout(() => {
      setIsOrderSuccess(false);
    }, 3000);
  }; 

  return (
    <div className="basketOrder">
      <h1 className="basketOrder__title">Оформление заказа</h1>
      <div className="desctopDisplay">
        <form className="basketOrderBox" onSubmit={(e) => handleSubmit(e)}>
          <label className="basketOrder__label">
            Имя
            <input type="text" className="basketOrder__input" />
          </label>
           
          <label className="basketOrder__label">
             Номер телефона
            <input type="text" className="basketOrder__input" />
          </label>
          
          <label className="basketOrder__label">
            Адрес доставки
            <input type="text" className="basketOrder__input" />
          </label>
          
          <label className="basketOrder__label">
            Оплата
            <label className="basketOrder__radio">
              <input type="radio" value="card" name="payment" checked/>
              <span>Карта</span>
            </label>
            <label className="basketOrder__radio">
              <input type="radio" value="cash" name="payment" />
              <span>Наличные</span>
            </label>
          </label>
          
          <label className="basketOrder__label">
            Комментарий

            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="basketOrder__input basketOrder__textArea"
            ></textarea>
          </label>
          
          <button className="basketOrder__button">Оформить заказ</button>
        </form>

        <div className="basketBox2">
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
      </div>

      {isOrderSuccess && (
        <div className="basketOrder__notification">
          <img src={success} alt="success" />
          <p>Заказ оформлен</p>
        </div>
      )}
    </div>
  );
};
