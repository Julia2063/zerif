import { React } from 'react';
import { Link } from 'react-router-dom';
import '../AccountEnterMain/AccountEnterMain.scss';

export const AccountEnterMain = () => {
  return (
    <div className="accountEnterMain">
      <h1 className="accountEnterMain__title">Личный кабинет</h1>
      
      <form action="" className="accountEnterMain__form">
        <div className="accountEnterMain__form-buttonBox">
          <button className="accountEnterMain__form-button accountEnterMain__form-button--active">
            Вход
          </button>
          <button className="accountEnterMain__form-button">
            Регистрация
          </button>
        </div>
        <input
          type="text"
          placeholder="email"
          className="accountEnterMain__form-input"
        />
        <input
          type="text"
          placeholder="пароль"
          className="accountEnterMain__form-input"
        />
        <div className="accountEnterMain__checkbox">
          <input type="checkbox" id="remember-password" />
          <label 
            htmlFor="remember-password" 
            className="checkboxText"
          >
              Запомнить меня
          </label>
        </div>
        <button className="accountEnterMain__submitButton">
          {' '}
          <Link to={'/account/information'} className="linkForPresentation">
              Войти
          </Link>{' '}
        </button>
      </form>
      <button className="accountEnterMain__forgotPassword">
          Забыли пароль?
      </button>
    </div>
  );
};
