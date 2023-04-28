import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

import { useTranslation } from 'react-i18next';
import viber from '../../images/HomePage/viberIcon.svg';
import facebook from '../../images/HomePage/facebookIcon.svg';
import youtube from '../../images/HomePage/youtubeIcon.svg';
import watsap from '../../images/HomePage/watsapIcon.svg';
import telegram from '../../images/HomePage/telegramIcon.svg';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <div className="footer__block1">
        <Link to={'/'}>
          <img
            src={require('../../images/Footer/Logo.png')}
            alt="logo image1"
            className="footer__block1--iconDesc"
          />
        </Link>
        <p className="footer__block1--text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="socialMedia">
          {t('socialMedia')}
        </p>
        <div className="footer__block1--links">
          <Link to={''}>
            <img
              src={viber}
              alt="viber icon"
              className="iconFrame"
            />
          </Link>
          <Link to={''}>
            <img
              src={facebook}
              alt="facebook icon"
              className="iconFrame"
            />
          </Link>
          <Link to={''}>
            <img
              src={youtube}
              alt="youtube icon"
              className="iconFrame"
            />
          </Link>
          <Link to={''}>
            <img
              src={watsap}
              alt="watsap icon"
              className="iconFrame"
            />
          </Link>
          <Link to={''}>
            <img
              src={telegram}
              alt="telegram icon"
              className="iconFrame"
            />
          </Link>
        </div>
      </div>

      <div className="oneMoreFooter">
        <div className="divForLink">
          <Link to={'/'} className="oneMoreFooter__link">
            {t('navigation.main')}
          </Link>
        </div>
        <div className="divForLink">
          <Link to={'/popular'} className="oneMoreFooter__link">
            {t('navigation.popular')}
          </Link>
        </div>
        <div className="divForLink">
          <Link to={'/categories'} className="oneMoreFooter__link">
            {t('navigation.goods')}
          </Link>
        </div>
        <div className="divForLink">
          <Link to={'/contacts'} className="oneMoreFooter__link">
            {t('navigation.contacts')}
          </Link>
        </div>
        <div className="divForLink">
          <Link to={'/account'} className="oneMoreFooter__link">
            {t('navigation.myAccount')}
          </Link>
        </div>
      </div>

      <div className="footer__block2">
        <div className="footer__block2--text">
          <p>{t('footer.contacts')}</p>
          <p>+ 3 000 000 00 00</p>
          <p>+ 3 000 000 00 00</p>
        </div>
        <div className="footer__block2--text">
          <p>{t('footer.mail')}</p>
          <p>zefir@gmail.com</p>
        </div>
      </div>

      <div className="footer__block2--text footer__block2">
        <p>{t('footer.schedule')}</p>
        <p>{t('footer.daily')}</p>
        <p>{t('footer.from')}</p>
      </div>

      <div className="footer__block3Mob">
        <p className="footer__block3--text">
          {t('footer.schedule')} - {t('footer.daily')} {t('footer.from')}
        </p>
      </div>
    </div>
  );
};
