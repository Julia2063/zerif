import React from 'react';

import cross from '../../images/AccountInformation/cross__white.svg';


export const ModalWithForm = ({
  title,
  setShowModalWithForm, 
  form,
}) => {
  
  return (
    <>
      <div className="modal">
        <div className="modal__window">
          <div className="modal__title">
            <div className="modal__between" />
            <p>{title}</p>
            <button
              className="modal__close"
              onClick={() => setShowModalWithForm(false)}
            >
              <img
                src={cross}
                alt="cross"
                className="modal__icon" />
            </button>
          </div>
          <div className="modal__body">
            {form}
          </div>
        </div>
      </div>
      <div className="modal__shadow" />
    </>
  );
};