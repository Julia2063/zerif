import React from 'react';
import '../Form/Form.scss';
import { useTranslation } from 'react-i18next';

export const Form = () => {
  const { t } = useTranslation();

  return (
    <div className="form">
      <div className="tillDesctop">
        <div className="form__content">
          <p className="form__content--title1">{t('homePage.whatToChoose')}</p>
          <p className="form__content--title2">
            {t('homePage.fillForm')}
          </p>

          <form action="" className="inputs">
            <label className="inputs__title">
              {t('form.name')}
              <input
                type="text"
                className="inputs__input"
                placeholder={t('form.fillName')}
              />
            </label>
           
            <label className="inputs__title">
              {t('form.phoneNumber')}
              <input
                type="text"
                className="inputs__input"
                placeholder={t('form.fillPhoneNumber')}
              />
            </label>
           
            <button className="inputs__button order-button">
              {t('form.send')}
            </button>
        
              
          </form>
        </div>
        <div className="imageWrap">
          <img
            src={require('../../../images/HomePage/formPieNew2.png')}
            alt=""
          />
        </div>
      </div>
    </div>

  );
};
