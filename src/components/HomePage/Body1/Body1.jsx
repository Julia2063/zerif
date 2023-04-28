import React from 'react';
import '../Body1/Body1.scss';

import { useTranslation } from 'react-i18next';
import { body1Api } from '../../../API/Body1API';
import { getRightData } from '../../../helpers/getrRightData';

export const Body1 = () => {

  const { t, i18n } = useTranslation();
  return (
    <div className="body1">
      <div className="body1__leftCookie"></div>
      <p className="body1__title1">{t('homePage.advantages')}</p>
      <p className="body1__title2">{t('homePage.why')}</p>
      <div className="body1__rightCookie"></div>

      <div className="container1">
        {body1Api.map((card) => (
          <div key={card.id} className="card">
            <img
              src={require(`../../../images/HomePage/body1/${card.id}.png`)}
              alt="card image1"
              className="card__photo"
            />
            <h1 className="card__title">{getRightData(card, i18n.language, 'title')}</h1>
            <p className="card__description">{getRightData(card, i18n.language, 'description')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
