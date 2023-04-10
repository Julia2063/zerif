import React from 'react';
import '../Body1/Body1.scss';
import '../../../styles/max1440.scss';
import { body1Api } from '../../../API/Body1API';

export const Body1 = () => {
  return (
    <div className="body1">
      <div className="body1__leftCookie"></div>
      <p className="body1__title1">Преимущества</p>
      <p className="body1__title2">Почему именно мы</p>
      <div className="body1__rightCookie"></div>

      <div className="container1">
        {body1Api.map((card) => (
          <div key={card.id} className="card">
            <img
              src={require(`../../../images/HomePage/body1/${card.id}.png`)}
              alt="card image"
              className="card__photo"
            />
            <h1 className="card__title">{card.title}</h1>
            <p className="card__description">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
