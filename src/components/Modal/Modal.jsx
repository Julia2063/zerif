import React from 'react';
import './Modal.scss';

import cross from '../../images/AccountInformation/cross__white.svg';
import { productsApi } from '../../API/deserts';

export const Modal = ({ title, message, handleModal }) => {

  const rightMessage = (message) => {
    return Array.isArray(message) 
      ? message.map(el => {
        return(
          <div>
            <img 
              src={require(`../../images/Products/${el.id}.png`)}
              alt=""
            />
            {Object.entries(el).sort((a, b) => a[0].length - b[0].length || a[1] - b[1]).map(e => {
              switch (e[0]) {
              case 'id':
                return <span>{productsApi.find(l => e[1] === l.id ).title}</span>;

              case 'price':
                return <span>{`$ ${e[1]}`}</span>;

              case 'count':
                return <span>{`x ${e[1]}`}</span>;

              default:
                return e[1]; 
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