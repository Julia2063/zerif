import { React, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

import './AccountEnterMain.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Modal } from '../Modal/Modal';
import { AppContext } from '../AppProvider';
import { createNewUser } from '../../helpers/firebaseControls';

export const AccountEnterMain = ({ isRegister }) => {

  const [regInfo, setRegInfo] = useState({
    email: '',
    password: '',
  });

  const [isModal, setIsModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const auth = getAuth();

  const { user, setUser } = useContext(AppContext);

  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      navigate('/account');
    }
  });

  const handleChange = (fieldName, newValue) => {
    const newRegInfo = {
      ...regInfo,
      [fieldName]: newValue,
    };

    setRegInfo(newRegInfo);
  };

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const handleRegister = (e, regInfo) => {
    e.preventDefault();

    if (regInfo.email.length === 0 || regInfo.password.length === 0) {
      setIsModal(true);
      setModalTitle(t('account.registerError'));
      setModalMessage(t('account.registerErrorMessage'));
      return;
    } else {
      
    
      createUserWithEmailAndPassword(auth, regInfo.email, regInfo.password)
        .then((userCredential) => {
          const newUser = userCredential.user;
          setRegInfo({
            email: '',
            password: '',
          });
          createNewUser(newUser);
          setIsModal(true);
          navigate('/basket');
        })
        .catch((error) => {
          setIsModal(true);
          setModalTitle(t('account.registerError'));
          setModalMessage(error.message);
        });;
    }
  }; 

  const handleLogin = (e, regInfo) => {
    e.preventDefault();

    if (regInfo.email.length === 0 || regInfo.password.length === 0) {
      setIsModal(true);
      setModalTitle(t('account.loginError'));
      setModalMessage(t('account.registerErrorMessage'));
      return;
    } else {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, regInfo.email, regInfo.password)
        .then((userCredential) => {
          const user = userCredential.user;

          setUser(user);
          navigate('/basket');
        })
        .catch((error) => {
          setIsModal(true);
          setModalMessage(error.message);
        });
    }
   
  };

  const handleResetPassword = () => {
    if (regInfo.email.length === 0) {
      setIsModal(true);
      setModalTitle(t('account.resetPasswordError'));
      setModalMessage(t('account.enterEmail'));
      return;
    } else {
      sendPasswordResetEmail(auth, regInfo.email)
        .then(() => {
          setIsModal(true);
          setModalTitle(t('account.notification'));
          setModalMessage(t('account.resetEmailSent'));
        })
        .catch(() => {
          setIsModal(true);
          setModalTitle(t('account.error'));
          setModalMessage(t('account.something'));
        });
    }
   
  };



  return (
    <div className="accountEnterMain">
      <h1 className="accountEnterMain__title">{t('navigation.myAccount')}</h1>
      
      <form 
        className="accountEnterMain__form"
        onSubmit={isRegister
          ? (e) => handleRegister(e, regInfo)
          : (e) => handleLogin(e, regInfo)
        }
      >
        <div className="accountEnterMain__form-buttonBox">
          <button 
            type="button"
            className={classNames(
              'accountEnterMain__form-button', 
              {'accountEnterMain__form-button--active': !isRegister}
            )}
             
            onClick={() => navigate('/account/login')}
          >
            {t('account.enter')}
          </button>
          <button 
            type="button"
            className={classNames(
              'accountEnterMain__form-button', 
              {'accountEnterMain__form-button--active': isRegister}
            )}
            onClick={() => navigate('/account/registration')}
          >
            {t('account.register')}
          </button>
        </div>
        <input
          type="email"
          value={regInfo.email}
          placeholder="email"
          className="accountEnterMain__form-input"
          onChange={(e) => handleChange('email', e.target.value)}
        />
        <input
          type="password"
          value={regInfo.password}
          placeholder={t('account.password')}
          className="accountEnterMain__form-input"
          onChange={(e) => handleChange('password', e.target.value)}
        />

        <label className="accountEnterMain__checkbox">
          <input type="checkbox"/>
          <span>{t('account.remember')}</span>
        </label>

        <button className="accountEnterMain__submitButton" type="submit">
          {isRegister ? t('account.registration') : t('account.enter')}
        </button>
      </form>
      <button 
        className="accountEnterMain__forgotPassword"
        onClick={handleResetPassword}
      >
        {t('account.forget')}
      </button>

      {isModal && (
        <Modal
          title={modalTitle} 
          message={modalMessage}
          handleModal={handleModal} 
        />
      )}
    </div>
    
  );
};
