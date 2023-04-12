import React from 'react';
import '../HideBody1/HideBody1.scss';

export const HideBody1 = () => {
  return (
    <div className="hideBody1 onDectop">
      <div className="blockRd">

        <div className="blockRd__imageWrap blockRd__imageWrap2">
          <img src={require('../../../images/HomePage/frontNew.png')} alt="" />
        </div>
        <div className="blockRd__someContent">

          <div className="someContentSide">
            <p className="blockRd__someContent--title">у нас Своё производство</p>
            <p className="blockRd__someContent--description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            
          </div>
        </div>
      
      </div>

      <button className="order-button hideBody1__button">оформить заказ</button>
    </div>
  );
};
