import React, { useContext, useState, useEffect } from 'react';
import '../BasketOrderPage/BasketOrder.scss';
import '../BasketPage/Basket.scss';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import success from '../../images/BasketPage/success.svg';
import { useLocalStorage } from '../../helpers/useLocalStorage';
import { AppContext } from '../AppProvider';
import { 
  createNewOrder,
  updateDocumentInCollection, 
} from '../../helpers/firebaseControls';
import { Modal } from '../Modal/Modal';

import noPhoto from '../../images/ProductForm/noPhoto.svg';
import { getRightData } from '../../helpers/getrRightData';



export const BasketOrder = () => {
  const [cartLocalStorage, setCartLocalStorage] = useLocalStorage('cart', []);
  const { cart, setCart, userInfo, user, setUserInfo, productsApi } = useContext(AppContext);

  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState(null);

  const [isModal, setIsModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { t, i18n } = useTranslation();

  useEffect(() => {
    setNewUserInfo(userInfo);
  }, [userInfo]);

  const navigate = useNavigate();

  const handleDeleteItem = (prod) => {
    const deleteIndex = cartLocalStorage.findIndex(el => el.id === prod.id);
    
    const newCart = cartLocalStorage.filter((el, i) => i !== deleteIndex);
    setCartLocalStorage(newCart);
    setCart(newCart);
  };

  useEffect(() => {
    if (cartLocalStorage.length === 0) {
      navigate('/categories');
    }
  }, [cartLocalStorage]);

  const handleInputChange = (e) => {
    setNewUserInfo(
      {...newUserInfo, [e.target.name] : e.target.value}
    );
  };

  console.log(newUserInfo);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(newUserInfo).some(el => el.length === 0)) {
      setIsModal(true);
      setErrorTitle(t('backet.orderError'));
      setErrorMessage(t('backet.errorMessage'));
      return;
    }

    setIsOrderSuccess(true);
    setTimeout(() => {
      setIsOrderSuccess(false);
    }, 3000);

    const oldUserData = Object.values(userInfo);
    const newUserData = Object.values(newUserInfo);

    console.log(oldUserData);
    

    if (oldUserData.some((el, i) => el !== newUserData[i])) {
      try {
        await updateDocumentInCollection('users', {...userInfo, ...newUserInfo}, userInfo.idPost);
        setUserInfo(newUserInfo);
      } catch (error) {
        setIsModal(true);
        setErrorTitle(t('account.somethingTwo'));
        setErrorMessage(error.message);
      }
    }

    const groupedCart = cartLocalStorage.map((el, i, arr) => {
      return {
        id: el.id, 
        ru: {
          title: el.ru.title,
        },
        en: {
          title: el.en.title,
        },
        az: {
          title: el.az.title,
        },
        price: el.price, 
        count: arr.filter(e => e.id === el.id).length,
      };
    });
    
    const orderInfo = {
      sum: cart.map(el => +el.price).reduce((a, b) => a + b, 0),
      details: groupedCart.reduce(
        (res, cur) =>
          res.find((find) => JSON.stringify(find) === JSON.stringify(cur))
            ? res
            : [...res, cur],
        []
      ),
    };

    try {
    
      await createNewOrder(orderInfo, user);
      setTimeout(() => {
        setCartLocalStorage([]);
        setCart([]);

      }, 3000);
      
    } catch (error) {
      setIsModal(true);
      setErrorTitle(t('account.somethingTwo'));
      setErrorMessage(error.message);
    }
  }; 

  const handleModal = () => {
    setIsModal(!isModal);
  };



  return (
    <div className="basketOrder">
      <h1 className="basketOrder__title">{t('orderButton')}</h1>
      <div className="desctopDisplay">
        <form className="basketOrderBox" onSubmit={(e) => handleSubmit(e)}>
          <label className="basketOrder__label">
            {t('contacts.name')}
            <input 
              name="name"
              type="text" 
              className="basketOrder__input" 
              value={newUserInfo?.name}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
           
          <label className="basketOrder__label">
            {t('account.phoneNumber')}
            <input 
              name="phoneNumber"
              type="text" 
              className="basketOrder__input"
              value={newUserInfo?.phoneNumber}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          
          <label className="basketOrder__label">
            {t('account.address')}
            <input 
              name="address"
              type="text" 
              className="basketOrder__input"
              value={newUserInfo?.address}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          
          <label className="basketOrder__label">
            {t('backet.payment')}
            <label className="basketOrder__radio">
              <input type="radio" value="card" name="payment" checked/>
              <span>{t('backet.card')}</span>
            </label>
            <label className="basketOrder__radio">
              <input type="radio" value="cash" name="payment" />
              <span>{t('backet.cash')}</span>
            </label>
          </label>
          
          <label className="basketOrder__label">
            {t('contacts.comments')}

            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="basketOrder__input basketOrder__textArea"
            ></textarea>
          </label>
          
          <button className="basketOrder__button">{t('orderButton')}</button>
        </form>

        <div className="basketBox2">
          <div className="basketBlock1">
            {cart.map((el, i) => {
              return (
                <div className="basketBlock1__item" key={i}>
                  <div className="imgBlock">
                    <img
                      src={productsApi.find(e => e.id === el.id)?.image || noPhoto}
                      alt="product image1"
                      className="basketBlock1__img"
                    />
                  </div>
                  <div className="basketBlock1__title">
                    <p>{getRightData(
                      productsApi.find(e => e.id === el.id), i18n.language, 'title'
                    )}</p>
                  </div>
            
         
                  <div className="basketBlock1__price">
                    <p>{`${el.price}$`}</p>
           
                  </div>
                  <button 
                    className="basketBlock1__deleteButton"
                    onClick={() => handleDeleteItem(el)}
                  >
                    <img
                      src={require('../../images/BasketPage/closeIcon.png')}
                      alt=""
              
                    />
                  </button>
                </div>
              );
            })}
           
          
          </div>
          <div className="basketBlock2">
            <div className="basketBlock2__productPrice">
              <p>{t('backet.product')}</p>
              <p>{`${cart.map(el => +el.price).reduce((a, b) => a + b, 0)}$`}</p>
            </div>
            <div className="basketBlock2__delivery">
              <p>{t('backet.delivery')}</p>
              <p>{t('backet.rates')}</p>
            </div>
            <div className="basketBlock2__fullCoast">
              <p>{t('backet.all')}</p>
              <p>{`${cart.map(el => +el.price).reduce((a, b) => a + b, 0)}$`}</p>
            </div>
          </div>
        </div>
      </div>

      {isOrderSuccess && (
        <div className="basketOrder__notification">
          <img src={success} alt="success" />
          <p>{t('backet.done')}</p>
        </div>
      )}

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
