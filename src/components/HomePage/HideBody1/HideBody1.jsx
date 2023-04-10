import React from 'react';
import '../HideBody1/HideBody1.scss';
import '../../../styles/max1440.scss';

export const HideBody1 = () => {
  return (
    <div className="hideBody1 onDectop">
      <div className="blockRd">
        <div className="blockRd__someContent">
          <div className="someContentSide">
            <p className="blockRd__someContent--title">у нас Своё производство</p>
            <p className="blockRd__someContent--description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button className="order-button">оформить заказ</button>
          </div>
        </div>
        <div className="blockRd__imageWrap blockRd__imageWrap2">
          <img src={require('../../../images/HomePage/frontNew.png')} alt="" /></div>
      </div>
    </div>
  );
};
