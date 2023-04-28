import React from 'react';
import '../PopularHeader/PopularHeader.scss';
import { useTranslation } from 'react-i18next';

export const PopularHeader = () => {

  const { t } = useTranslation();
  return (
    
    <div className="popular">
      <div>
        <div className="imageBox">
          <img
            src={require('../../../images/Popular/macaroons.png')}
            alt="macaroons"
            className="popHeadImg"
          />
          <img
            src={require('../../../images/Popular/macaroonsDesc.png')}
            alt="macaroons"
            className="popHeadImgDesc"
          />
        </div>
        <div className="popular__content">
          <p className="popular__content--title1">{t('popular.title')}</p>
          <p className="popular__content--title2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
              eiusmod tempor
          </p>
        </div>
      </div>
    </div>
  );
};
