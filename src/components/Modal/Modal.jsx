import React, { useContext } from 'react';
import './Modal.scss';

import { useTranslation } from 'react-i18next';
import cross from '../../images/AccountInformation/cross__white.svg';
import { AppContext } from '../AppProvider';

import noPhoto from '../../images/ProductForm/noPhoto.svg';
import { getRightData } from '../../helpers/getrRightData';

export const Modal = ({ title, message, handleModal }) => {

  const { productsApi } = useContext(AppContext);

  const { i18n } = useTranslation();

  const rightMessage = (message) => {
    return Array.isArray(message) 
      ? message.map(el => {
        return(
          <div key={el.id} className="modal__body-text">
            <img 
              src={productsApi.find(e => e.id === el.id)?.image || noPhoto}
              alt=""
            />
            {Object.entries(el).sort((a, b) => a[0].length - b[0].length || a[1] - b[1]).map(e => {
              

              switch (e[0]) {
              case 'id':
                return <span key={e[0]}>
                  {getRightData(el, i18n.language, 'title')}
                 
                </span>;

              case 'price':
                return <span key={e[0]}>{`$ ${e[1]}`}</span>;

              case 'count':
                return <span key={e[0]}>{`x ${e[1]}`}</span>;

              default:
                return null; 
              }
              
            })}
          </div>
        );
      })
      : message;
  };
    
  return (
    <>
      <div className="modal">
        <div className="modal__window">
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
          <div className="modal__body">
            {rightMessage(message)}
          </div>
        </div>
      </div>
      <div className="modal__shadow" />
    </>
  );
};