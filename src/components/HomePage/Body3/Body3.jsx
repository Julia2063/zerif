import React from 'react';
import '../Body3/Body3.scss';

import { useNavigate } from 'react-router-dom';
import { body3Api } from '../../../API/Body3API';

export const Body3 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/categories');
  };

  return (
    <div className="body3">
      <p className="body3__title1">Рекомендуем</p>
      <p className="body3__title2">Авторские десерты</p>

      <div className="container3">
        {body3Api.map((card) => (
          <div className="card3" key={card.id}>
            <img
              src={require(`../../../images/HomePage/body3/${card.id}.png`)}
              alt=""
              className="card3__photo"
            />
            <p className="card3__title">{card.title}</p>
            <p className="card3__description">{card.description}</p>
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
          <p className="container3Mob__title">ДЕСЕРТ С КЛУБНИКОЙ</p>
          <p className="container3Mob__description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>
      </div>

      <button 
        className="allProducts-button"
        onClick={handleClick}
      >
        <span>Весь ассортимент</span>
        <p>&#10095;</p>
      </button>
    </div>
  
  );
};
