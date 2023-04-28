import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../AppProvider';

import './ReAuthForm.scss';


export const ReAuthForm = ({
  setShowModalWithForm, 
  setPromptForCredentials,
}) => {
  const { user } = useContext(AppContext);
  const [newDataModal, setNewDataModal] = useState({email: user.email, password: ''});

  const { t } = useTranslation();

  const handleChangeModal = (fieldName, newValue) => {
    setNewDataModal({
      ...newDataModal,
      [fieldName]: newValue,
    });
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();    
    setPromptForCredentials(newDataModal);
    
    setShowModalWithForm(false);
  };

  return (
    <form onSubmit={(e) => handleSubmitModal(e)} className="reAuthForm">
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
        placeholder={t('account.password')}
        className="accountEnterMain__form-input"
        onChange={(e) => handleChangeModal('password', e.target.value)} 
      />
      <button hidden></button>
    </form>
  );
};