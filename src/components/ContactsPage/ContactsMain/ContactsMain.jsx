import { React } from 'react';
import '../ContactsMain/ContactsMain.scss';

import viber from '../../../images/Contacts/viberIcon.svg';
import facebook from '../../../images/Contacts/facebookIcon.svg';
import youtube from '../../../images/Contacts/youtubeIcon.svg';
import watsap from '../../../images/Contacts/watsapIcon.svg';
import telegram from '../../../images/Contacts/telegramIcon.svg';

export const ContactsMain = () => {
  return (
    <div className="contactsMain">
      <div className="contactsMain__content">
        <p className="contactsMain__content--title">Контакты</p>
        <p className="contactsMain__content--font1">
          Возникли вопросы? Хотите уточнить детали заказа? Свяжитесь с нами:
        </p>
        <p className="contactsMain__content--font1 contTitle">Телефон:</p>
        <div className="contactsMain__content--font2">
          <p>+ 0 000 000 00 00</p>
          <p >+ 0 000 000 00 00</p>
        </div>
        <p className="contactsMain__content--font1 contTitle">Email</p>
        <p className="contactsMain__content--font2">zefir@gmail.com</p>
        <p className="contactsMain__content--font1 contTitle">Соцсети:</p>
        <nav className="contactsMain__content--nav">
          <a href="">
            <img
              src={viber}
              alt=""
            />
          </a>
          <a href="">
            <img
              src={facebook}
              alt=""
            />
          </a>
          <a href="">
            <img
              src={youtube}
              alt=""
            />
          </a>
          <a href="">
            <img
              src={watsap}
              alt=""
            />
          </a>
          <a href="">
            <img
              src={telegram}
              alt=""
            />
          </a>
        </nav>
      </div>
      <div className="contactsMain__form">
        <p className="contactsMain__form-title">
          Форма обратной связи:
        </p>
        <form action="">
          <label className="contactsMain__form-label">
            Имя
            <input type="text" className="contactsMain__form-textInputs" />
          </label>
         
          <label className="contactsMain__form-label">
            Email
            <input type="text" className="contactsMain__form-textInputs" />
          </label>
          
          <label className="contactsMain__form-label">
            Комментарий
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="contactsMain__form-textArea"
            ></textarea>
          </label>
          
          <button className="contactsMain__form-button">Отправить</button>
        </form>
      </div>
    </div>
  );
};
