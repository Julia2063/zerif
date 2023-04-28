import React from 'react';
import '../Body3/Body3.scss';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { body3Api } from '../../../API/Body3API';
import { getRightData } from '../../../helpers/getrRightData';

export const Body3 = () => {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const handleClick = () => {
    navigate('/categories');
  };

  return (
    <div className="body3">
      <p className="body3__title1">{t('homePage.recommended')}</p>
      <p className="body3__title2">{t('homePage.author\'sDesserts')}</p>

      <div className="container3">
        {body3Api.map(card => (
          <div className="card3" key={card.id}>
            <img
              src={require(`../../../images/HomePage/body3/${card.id}.png`)}
              alt=""
              className="card3__photo"
            />
            <p className="card3__title">
              {getRightData(card, i18n.language, 'title')}
            </p>
            <p className="card3__description">
              {getRightData(card, i18n.language, 'description')}
            </p>
          </div>
        ))}
      </div>

      <div className="container3Mob">
        <div className="container3Mob__card">
          <img
            src={require('../../../images/HomePage/body3/1.png')}
            alt=""
            className="card3__photo"
          />
          <p className="container3Mob__title">
            {getRightData(body3Api[0], i18n.language, 'title')}
          </p>
          <p className="container3Mob__description">
            {getRightData(body3Api[0], i18n.language, 'description')}
          </p>
        </div>
      </div>

      <button 
        className="allProducts-button"
        onClick={handleClick}
      >
        <span>{t('wholeRange')}</span>
        <p>&#10095;</p>
      </button>
    </div>
  
  );
};
