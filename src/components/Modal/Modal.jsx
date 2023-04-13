import React from 'react';
import './Modal.scss';

import cross from '../../images/AccountInformation/cross__white.svg';

export const Modal = ({ title, message, handleModal }) => {
    
  return (
    <>
      <div className="modal">
        <div class="modal__window">
          <div className="modal__title">
            <div className="modal__between" />
            <p>{title}</p>
            <button className="modal__close" onClick={handleModal}>
              <img 
                src={cross} 
                alt="cross" 
                className="modal__icon"
              />
            </button>
          </div>
          <div class="modal__body">
            {message}
          </div>
        </div>
      </div>
      <div className="modal__shadow" />
    </>
  );
};