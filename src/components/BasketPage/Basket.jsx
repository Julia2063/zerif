import React, { useContext, useEffect, useState } from 'react';
import '../BasketPage/Basket.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../helpers/useLocalStorage';
import { AppContext } from '../AppProvider';
import { Modal } from '../Modal/Modal';

import cross from '../../images/AccountInformation/cross__white.svg';


export const Basket = () => {
  const [cartLocalStorage, setCartLocalStorage] = useLocalStorage('cart', []);
  const { cart, setCart, user } = useContext(AppContext);
  const [visibledCart, setVisibledCart] = useState([]);
  const navigate = useNavigate();
  
  const [isModal, setIsModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handleModal = () => {
    setIsModal(!isModal);
  };

  useEffect(() => {
    
    const groupedCart = cartLocalStorage.map((el, i, arr) => {
      return [el.id, arr.filter(e => e.id === el.id).length];
    }).map(el => el[0]).filter((el, i, arr) => !arr.slice(i + 1).includes(el));
    const newVisibledCart = groupedCart.map(el => cartLocalStorage.find(e => e.id === el));
    setVisibledCart(newVisibledCart);
  }, []);


  const [counts, setCounts] = useState([]);

  useEffect (() => {
    if (cartLocalStorage.length === 0) {
      navigate('/categories');
    }
    const newCounts = visibledCart.map(el => cartLocalStorage.filter(e => el.id === e.id).length);
    const indexZero = newCounts.findIndex(el => el === 0);

      


    if (indexZero >= 0) {
      console.log(indexZero);
      
      const newVisibledCart = visibledCart.filter((el, i) => i !== indexZero);
      setVisibledCart(newVisibledCart);

    }
    setCounts(newCounts);

    
  }, [cartLocalStorage]);

  console.log(visibledCart);

  const handleCountInc = (prod) => {
    const newCart = [...cartLocalStorage, prod];
    setCartLocalStorage(newCart);
    setCart(newCart);
  };

  const handleCountDec = (prod) => {
    const deleteIndex = cartLocalStorage.findIndex(el => el.id === prod.id);
    
    const newCart = cartLocalStorage.filter((el, i) => i !== deleteIndex);
    setCartLocalStorage(newCart);
    setCart(newCart);
  };


  const handleDeleteItem = (prod) => {
    const newCart = cartLocalStorage.filter(el => el.id !== prod.id);
    setCartLocalStorage(newCart);
    setCart(newCart);
  };


  const handleOrder = () => {
    if (!user) {
      setIsModal(true);
    } else {
      navigate('/basket/order');
    }
  };

  

  return (
    <div className="basket">
      <h1 className="basket__title">Корзина</h1>
      <div className="basketBox">
        <div className="basketBlock1">
          {visibledCart.map((el, i) => {
            
            return (
              <div className="basketBlock1__item" key={el.id}>
                <div className="imgBlock">
                  <img
                    src={require(`../../images/Products/${el.id}.png`)}
                    alt="product image1"
                    className="basketBlock1__img"
                  />
                </div>
                <div className="basketBlock1__title">
                  <p>{el.title}</p>
        
                  <div className="basketBlock1__counterBox">
                    <button 
                      className="basketBlock1__counterButton"
                      onClick={() => handleCountDec(el)}
                    > 
                      - 
                    </button>
                    <p className="basketBlock1__counterText">{counts[i] 
                      || cart.filter(e => el.id === e.id).length}</p>
                    <button 
                      className="basketBlock1__counterButton"
                      onClick={() => handleCountInc(el)}
                    > 
                      + 
                    </button>
                  </div>
                </div>
            
         
                <div className="basketBlock1__price">
                  <p>{`${ el.price}$`}</p>
           
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
            <p>{`${cart.map(el => el.price).reduce((a, b) => a + b, 0)}$`}</p>
          </div>
          <div className="basketBlock2__delivery">
            <p>Доставка:</p>
            <p>По тарифам перевозчика</p>
          </div>
          <div className="basketBlock2__fullCoast">
            <p>Всего:</p>
            <p>{`${cart.map(el => el.price).reduce((a, b) => a + b, 0)}$`}</p>
          </div>
        </div>
      </div>
      <button 
        className="basket__button"
        onClick={handleOrder}
      > 
          Оформить заказ 
      </button>

      {isModal && (
        <>
          <div className="modal">
            <div class="modal__window">
              <div className="modal__title">
                <div className="modal__between" />
                <p>Order error</p>
                <button className="modal__close" onClick={handleModal}>
                  <img
                    src={cross}
                    alt="cross"
                    className="modal__icon" />
                </button>
              </div>
              <div class="modal__body">
               Чтобы сделать заказ, нужно 
                {' '}
                <Link to="/account/registration" isRegister={true}> 
                Зарегистрироваться
                </Link> или <Link to="/account/login" isRegister={false}>Войти</Link>
              </div>
            </div>
          </div><div className="modal__shadow" />
        </>
      )}
    </div>
  );
};
