import React from 'react';
import '../PopularHeader/PopularHeader.scss';

export const PopularHeader = () => {
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
          <p className="popular__content--title1">Сладкие новинки </p>
          <p className="popular__content--title2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
              eiusmod tempor
          </p>
        </div>
      </div>
    </div>
  );
};
