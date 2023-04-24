import React, { useContext, useState, useEffect } from 'react';
import '../BasketOrderPage/BasketOrder.scss';
import '../BasketPage/Basket.scss';

import { useNavigate } from 'react-router-dom';
import success from '../../images/BasketPage/success.svg';
import { useLocalStorage } from '../../helpers/useLocalStorage';
import { AppContext } from '../AppProvider';
import { createNewOrder, updateDocumentInCollection } from '../../helpers/firebaseControls';
import { Modal } from '../Modal/Modal';



export const BasketOrder = () => {
  const [cartLocalStorage, setCartLocalStorage] = useLocalStorage('cart', []);
  const { cart, setCart, userInfo, user, setUserInfo, productsApi } = useContext(AppContext);

  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState(null);

  const [isModal, setIsModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      setErrorTitle('Ошибка заказа');
      // eslint-disable-next-line max-len
      setErrorMessage('Заполните поля "Имя", "Номер телефона" и "Адрес доставки", пожалуйста! Эти данные необходимы для отправки заказа');
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
        setErrorTitle('Something went wrong...');
        setErrorMessage(error.message);
      }
    }

    const groupedCart = cartLocalStorage.map((el, i, arr) => {
      return {id: el.id, price: el.price, count: arr.filter(e => e.id === el.id).length};
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
      setErrorTitle('Something went wrong...');
      setErrorMessage(error.message);
    }
  }; 

  const handleModal = () => {
    setIsModal(!isModal);
  };



  return (
    <div className="basketOrder">
      <h1 className="basketOrder__title">Оформление заказа</h1>
      <div className="desctopDisplay">
        <form className="basketOrderBox" onSubmit={(e) => handleSubmit(e)}>
          <label className="basketOrder__label">
            Имя
            <input 
              name="name"
              type="text" 
              className="basketOrder__input" 
              value={newUserInfo?.name}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
           
          <label className="basketOrder__label">
             Номер телефона
            <input 
              name="phoneNumber"
              type="text" 
              className="basketOrder__input"
              value={newUserInfo?.phoneNumber}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          
          <label className="basketOrder__label">
            Адрес доставки
            <input 
              name="address"
              type="text" 
              className="basketOrder__input"
              value={newUserInfo?.address}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          
          <label className="basketOrder__label">
            Оплата
            <label className="basketOrder__radio">
              <input type="radio" value="card" name="payment" checked/>
              <span>Карта</span>
            </label>
            <label className="basketOrder__radio">
              <input type="radio" value="cash" name="payment" />
              <span>Наличные</span>
            </label>
          </label>
          
          <label className="basketOrder__label">
            Комментарий

            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="basketOrder__input basketOrder__textArea"
            ></textarea>
          </label>
          
          <button className="basketOrder__button">Оформить заказ</button>
        </form>

        <div className="basketBox2">
          <div className="basketBlock1">
            {cart.map((el, i) => {
              return (
                <div className="basketBlock1__item" key={i}>
                  <div className="imgBlock">
                    <img
                      src={productsApi.find(e => e.id === el.id)?.image}
                      alt="product image1"
                      className="basketBlock1__img"
                    />
                  </div>
                  <div className="basketBlock1__title">
                    <p>{el.title}</p>
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
              <p>Товар:</p>
              <p>{`${cart.map(el => +el.price).reduce((a, b) => a + b, 0)}$`}</p>
            </div>
            <div className="basketBlock2__delivery">
              <p>Доставка:</p>
              <p>По тарифам перевозчика</p>
            </div>
            <div className="basketBlock2__fullCoast">
              <p>Всего:</p>
              <p>{`${cart.map(el => +el.price).reduce((a, b) => a + b, 0)}$`}</p>
            </div>
          </div>
        </div>
      </div>

      {isOrderSuccess && (
        <div className="basketOrder__notification">
          <img src={success} alt="success" />
          <p>Заказ оформлен</p>
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
