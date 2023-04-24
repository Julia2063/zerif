import React from 'react';
import '../HideBody2/HideBody2.scss';
import { useNavigate } from 'react-router-dom';

export const HideBody2 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/categories');
  };

  return (
    <div className="hideBody2">
      <div className="blockRd3">
        
        <div className="blockRd3__someContent">
         

          <h3 className="blockRd3__someContent--title">Авторские рецепты</h3>
          <p className="blockRd3__someContent--description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud
          </p>
          <button 
            className="order-button"
            onClick={handleClick}
          >
                Оформить заказ
          </button>
        </div>
        <div className="blockRd3__imageWrap blockRd__imageWrap2">
          <img src={require('../../../images/HiddenBlock2/3.png')} alt="" />
          
        </div>
      </div>
    </div>
  );
};
