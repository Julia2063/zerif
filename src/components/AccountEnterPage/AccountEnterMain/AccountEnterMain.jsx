import { React, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
} from 'firebase/auth';

import '../AccountEnterMain/AccountEnterMain.scss';
import classNames from 'classnames';
import { Modal } from '../../Modal/Modal';
import { AppContext } from '../../AppProvider';

export const AccountEnterMain = () => {
  const [isRegistration, setIsRegistration] = useState(true);
  const [regInfo, setRegInfo] = useState({
    email: '',
    password: '',
  });

  const [isModal, setIsModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

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
      setErrorTitle('Registration error');
      setErrorMessage('Enter email and password please!');
      return;
    } else {
      const auth = getAuth();
    
      createUserWithEmailAndPassword(auth, regInfo.email, regInfo.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setIsRegistration(false);
          setRegInfo({
            email: '',
            password: '',
          });
          setIsModal(true);
          setErrorTitle('Success!');
          setErrorMessage('Registration completed successfully! Please, logIn!');
        })
        .catch((error) => {
          setIsModal(true);
          setErrorTitle('Registration error');
          setErrorMessage(error.message);
        });;
    }
  }; 

  const handleLogin = (e, regInfo) => {
    e.preventDefault();

    if (regInfo.email.length === 0 || regInfo.password.length === 0) {
      setIsModal(true);
      setErrorTitle('Login error');
      setErrorMessage('Enter email and password please!');
      return;
    } else {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, regInfo.email,regInfo.password)
        .then((userCredential) => {
          const user = userCredential.user;

          setUser(user);
          navigate('/');
        })
        .catch((error) => {
          setIsModal(true);
          setErrorMessage(error.message);
        });
    }
   
  };



  return (
    <div className="accountEnterMain">
      <h1 className="accountEnterMain__title">Личный кабинет</h1>
      
      <form 
        className="accountEnterMain__form"
        onSubmit={isRegistration 
          ? (e) => handleRegister(e, regInfo)
          : (e) => handleLogin(e, regInfo)
        }
      >
        <div className="accountEnterMain__form-buttonBox">
          <button 
            type="button"
            className={classNames(
              'accountEnterMain__form-button', 
              {'accountEnterMain__form-button--active': !isRegistration}
            )}
             
            onClick={() => setIsRegistration(false)}
          >
            Вход
          </button>
          <button 
            type="button"
            className={classNames(
              'accountEnterMain__form-button', 
              {'accountEnterMain__form-button--active': isRegistration}
            )}
            onClick={() => setIsRegistration(true)}
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
          {isRegistration ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>
      <button className="accountEnterMain__forgotPassword">
          Забыли пароль?
      </button>

      {isModal && (
        <Modal
          title={errorTitle} 
          message={errorMessage}
          handleModal={handleModal} 
        />
      )}
    </div>
    
  );
};
