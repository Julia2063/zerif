import React from 'react';
import '../Form/Form.scss';

export const Form = () => {
  return (
    <div className="form">
      <div className="tillDesctop">
        <div className="form__content">
          <p className="form__content--title1"> Не знаете что выбрать?</p>
          <p className="form__content--title2">
                Заполните форму ниже и мы обязательно с Вами свяжемся!
          </p>

          <form action="" className="inputs">
            <label className="inputs__title">Имя:
              <input
                type="text"
                className="inputs__input"
                placeholder="Введите Ваше имя"
              />
            </label>
           
            <label className="inputs__title">Телефон:
              <input
                type="text"
                className="inputs__input"
                placeholder="Введите Ваш телефон"
              />
            </label>
           
            <button className="inputs__button order-button">Отправить</button>
        
              
          </form>
        </div>
        <div className="imageWrap">
          <img
            src={require('../../../images/HomePage/formPieNew2.png')}
            alt=""
          />
        </div>
      </div>
    </div>

  );
};
