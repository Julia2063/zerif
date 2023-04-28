import React from 'react';
import '../PopularBlock2/PopularBlock2.scss';
import { useTranslation } from 'react-i18next';


export const PopularBlock2 = () => {
  const { t } = useTranslation();
  return (
    <div className="popularBlock2">
      <p className="popularBlock2__title">{t('popular.birthdayCakes')}</p>
      <p className="popularBlock2__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
          tempor
      </p>
      <img
        src={require('../../../images/Popular/chocoPie.png')}
        alt="chocolate pie"
        className="popularBlock2__img1"
      />
      <img
        src={require('../../../images/Popular/fruitPie.png')}
        alt="fruit pie"
        className="popularBlock2__img2"
      />
      <img
        src={require('../../../images/Popular/honeyPie.png')}
        alt="fruit pie"
        className="honeyPie"
      />
      <img
        src={require('../../../images/Popular/fullFruitPie.png')}
        alt="fruit pie"
        className="fullFruitPie"
      />
    </div>
  );
};
