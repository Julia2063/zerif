import { React } from 'react';
import '../ContactsMain/ContactsMain.scss';

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
            {' '}
            <img
              src={require('../../../images/Contacts/viberIcon.png')}
              alt=""
            />{' '}
          </a>
          <a href="">
            {' '}
            <img
              src={require('../../../images/Contacts/facebookIcon.png')}
              alt=""
            />{' '}
          </a>
          <a href="">
            {' '}
            <img
              src={require('../../../images/Contacts/youtubeIcon.png')}
              alt=""
            />{' '}
          </a>
          <a href="">
            {' '}
            <img
              src={require('../../../images/Contacts/watsapIcon.png')}
              alt=""
            />{' '}
          </a>
          <a href="">
            {' '}
            <img
              src={require('../../../images/Contacts/telegramIcon.png')}
              alt=""
            />{' '}
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
