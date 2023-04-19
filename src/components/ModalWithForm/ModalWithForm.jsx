import React, { useContext, useState } from 'react';

import cross from '../../images/AccountInformation/cross__white.svg';
import { AppContext } from '../AppProvider';

export const ModalWithForm = ({
  setShowReAutrnticateNotification, 
  setPromptForCredentials,
}) => {
  const { user } = useContext(AppContext);
  const [newDataModal, setNewDataModal] = useState({email: user.email, password: ''});

  const handleChangeModal = (fieldName, newValue) => {
    setNewDataModal({
      ...newDataModal,
      [fieldName]: newValue,
    });
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();    
    setPromptForCredentials(newDataModal);
    
    setShowReAutrnticateNotification(false);
  };
    
  return (
    <>
      <div className="modal">
        <div className="modal__window">
          <div className="modal__title">
            <div className="modal__between" />
            <p>To change the email, please log in again</p>
            <button
              className="modal__close"
              onClick={() => setShowReAutrnticateNotification(false)}
            >
              <img
                src={cross}
                alt="cross"
                className="modal__icon" />
            </button>
          </div>
          <div className="modal__body">
            <form onSubmit={(e) => handleSubmitModal(e)}>
              <input
                type="email"
                value={newDataModal.email}
                placeholder="email"
                className="accountEnterMain__form-input"
                onChange={(e) => handleChangeModal('email', e.target.value)} 
              />
              <input
                type="password"
                value={newDataModal.password}
                placeholder="пароль"
                className="accountEnterMain__form-input"
                onChange={(e) => handleChangeModal('password', e.target.value)} 
              />
              <button hidden></button>
            </form>
          </div>
        </div>
      </div>
      <div className="modal__shadow" />
    </>
  );
};