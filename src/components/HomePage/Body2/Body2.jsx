import React from 'react';
import '../Body2/Body2.scss';

import { body2Api } from '../../../API/Body2API';
import leftArrow from '../../../images/HomePage/leftSlide.png';
import rightArrow from '../../../images/HomePage/rightSlide.png';

export const Body2 = () => {
  return (
    <div className="body2">
      <p className="body2__title1">Рекомендуем</p>
      <p className="body2__title2">Торты на любой вкус</p>

      <div className="container2">
        <div className="container2__slider">
          <button className="container2__button">
            <img src={leftArrow} alt="leftArrow" />
          </button>
          {body2Api.map((card) => (
            <div className="card2" key={card.id}>
              <img
                src={require(`../../../images/HomePage/body2/${card.id}.png`)}
                alt="card photo"
                className="card2__photo"
              />
              <p className="card2__title">{card.title}</p>
              <p className="card2__description">{card.description}</p>
            </div>
          ))}
          <button className="container2__button">
            <img src={rightArrow} alt="rightArrow" />
          </button>
        </div>

        <div className="container2__mobile">
          <div className="card2">
            <img
              src={require(`../../../images/HomePage/body2/${body2Api[0].id}.png`)}
              alt="card photo"
              className="card2__photo"
            />
            <p className="card2__title">{body2Api[0].title}</p>
            <p className="card2__description">{body2Api[0].description}</p>
          </div>
        </div>
      </div>
        

      <button className="allProducts-button">
        <span>Весь ассортимент</span>
        <p>&#10095;</p>
      </button>
    </div>
  );
};
