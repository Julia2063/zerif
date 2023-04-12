import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__block1">
        <Link to={'/'}>
          <img
            src={require('../../images/Footer/Logo.png')}
            alt="logo image"
            className="footer__block1--iconDesc"
          />
        </Link>
        <p className="footer__block1--text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="socialMedia">Социальные сети:</p>
        <div className="footer__block1--links">
          <Link to={''}>
            <img
              src={require('../../images/HomePage/viberIcon.png')}
              alt="viber icon"
              className="iconFrame"
            />
          </Link>
          <Link to={''}>
            <img
              src={require('../../images/HomePage/facebookIcon.png')}
              alt="facebook icon"
              className="iconFrame"
            />
          </Link>
          <Link to={''}>
            <img
              src={require('../../images/HomePage/youtubeIcon.png')}
              alt="youtube icon"
              className="iconFrame"
            />
          </Link>
          <Link to={''}>
            <img
              src={require('../../images/HomePage/watsapIcon.png')}
              alt="watsap icon"
              className="iconFrame"
            />
          </Link>
          <Link to={''}>
            <img
              src={require('../../images/HomePage/telegramIcon.png')}
              alt="telegram icon"
              className="iconFrame"
            />
          </Link>
        </div>
      </div>

      <div className="oneMoreFooter">
        <div className="divForLink">
          <Link to={'/'} className="oneMoreFooter__link">
            Главная
          </Link>
        </div>
        <div className="divForLink">
          <Link to={'/popular'} className="oneMoreFooter__link">
            Популярное
          </Link>
        </div>
        <div className="divForLink">
          <Link to={'/products'} className="oneMoreFooter__link">
            Товары
          </Link>
        </div>
        <div className="divForLink">
          <Link to={'/contacts'} className="oneMoreFooter__link">
            Контакты
          </Link>
        </div>
        <div className="divForLink">
          <Link to={'/account'} className="oneMoreFooter__link">
            Личный кабинет
          </Link>
        </div>
      </div>

      <div className="footer__block2">
        <div className="footer__block2--text">
          <p>Контакты:</p>
          <p>+ 3 000 000 00 00</p>
          <p>+ 3 000 000 00 00</p>
        </div>
        <div className="footer__block2--text">
          <p>Почта:</p>
          <p>zefir@gmail.com</p>
        </div>
      </div>

      <div className="footer__block2--text footer__block2">
        <p>График работы:</p>
        <p>Ежедневно</p>
        <p>с 09:00 до 21:00</p>
      </div>

      <div className="footer__block3Mob">
        <p className="footer__block3--text">
          График работы - ежедневно с 09:00 до 21:00
        </p>
      </div>
    </div>
  );
};
