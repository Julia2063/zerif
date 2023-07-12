import React, { useContext } from 'react';
import '../Body3/Body3.scss';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { body3Api } from '../../../API/Body3API';
import { getRightData } from '../../../helpers/getrRightData';
import { AppContext } from '../../AppProvider';

export const Body3 = () => {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const { productsApi } = useContext(AppContext);

  const handleClick = () => {
    navigate('/categories');
  };

  return (
    <div className="body3">
      <p className="body3__title1">{t('homePage.recommended')}</p>
      <p className="body3__title2">{t('homePage.author\'sDesserts')}</p>

      <div className="container3">
        {productsApi.length > 0 && productsApi.slice(0, 10).map(card => (
          <div className="card3" key={card.id}>
          
            <img
              src={card.image}
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
            src={productsApi[0]?.image}
            alt=""
            className="card3__photo"
          />
          <p className="container3Mob__title">
            {getRightData(productsApi[0], i18n.language, 'title')}
          </p>
          <p className="container3Mob__description">
            {getRightData(productsApi[0], i18n.language, 'description')}
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
