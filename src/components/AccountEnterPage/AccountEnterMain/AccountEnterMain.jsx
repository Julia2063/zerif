import { React, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

import '../AccountEnterMain/AccountEnterMain.scss';
import classNames from 'classnames';
import { Modal } from '../../Modal/Modal';
import { AppContext } from '../../AppProvider';
import { createNewUser } from '../../../helpers/firebaseControls';

export const AccountEnterMain = ({ isRegister }) => {

  const [regInfo, setRegInfo] = useState({
    email: '',
    password: '',
  });

  console.log(isRegister);

  const [isModal, setIsModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const auth = getAuth();

  const { user, setUser } = useContext(AppContext);

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
      setModalTitle('Registration error');
      setModalMessage('Enter email and password please!');
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
          setModalTitle('Success!');
          setModalMessage('Registration completed successfully!');
          navigate('/basket');
        })
        .catch((error) => {
          setIsModal(true);
          setModalTitle('Registration error');
          setModalMessage(error.message);
        });;
    }
  }; 

  const handleLogin = (e, regInfo) => {
    e.preventDefault();

    if (regInfo.email.length === 0 || regInfo.password.length === 0) {
      setIsModal(true);
      setModalTitle('Login error');
      setModalMessage('Enter email and password please!');
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
      setModalTitle('Reset password error');
      setModalMessage('Enter your email please!');
      return;
    } else {
      sendPasswordResetEmail(auth, regInfo.email)
        .then(() => {
          setIsModal(true);
          setModalTitle('Notification');
          setModalMessage(
            // eslint-disable-next-line max-len
            'Password reset email sent! Please check it, confirm reset and re-login! Don\'t forget check "Spam" folder!'
          );
        })
        .catch(() => {
          setIsModal(true);
          setModalTitle('Error');
          setModalMessage('Something went wrong with reset password sending');
        });
    }
   
  };



  return (
    <div className="accountEnterMain">
      <h1 className="accountEnterMain__title">Личный кабинет</h1>
      
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
            Вход
          </button>
          <button 
            type="button"
            className={classNames(
              'accountEnterMain__form-button', 
              {'accountEnterMain__form-button--active': isRegister}
            )}
            onClick={() => navigate('/account/registration')}
          >
            Регистрация
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
          placeholder="пароль"
          className="accountEnterMain__form-input"
          onChange={(e) => handleChange('password', e.target.value)}
        />

        <label className="accountEnterMain__checkbox">
          <input type="checkbox"/>
          <span>Запомнить меня</span>
        </label>

        <button className="accountEnterMain__submitButton" type="submit">
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>
      <button 
        className="accountEnterMain__forgotPassword"
        onClick={handleResetPassword}
      >
          Забыли пароль?
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
