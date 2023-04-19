import React, { useState, useEffect, useContext } from 'react';
import './ProductCardMain.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { productsApi } from '../../API/deserts';
import success from '../../images/BasketPage/success.svg';



import 'swiper/scss';

import '../../styles/swiperScrollBar.scss';
import { ProductCardMini } from '../ProductCardMini/ProductCardMini';
import { useLocalStorage } from '../../helpers/useLocalStorage';
import { AppContext } from '../AppProvider';


export const ProductCardMain = () => {
  

  const [isProductAdd, setIsProductAdd] = useState(false);

  const handleAdd = () => {
    setIsProductAdd(true); 
    setTimeout(() => {
      setIsProductAdd(false);
    }, 3000);
  };

  const [feedbackTab, setFeedbackTab] = useState(true);
  const [detailsTab, setDetailsTab] = useState(false);
  const [informationTab, setInformationTab] = useState(false);

  const [product, setProduct] = useState({});

  const [sameProducts, setSameProducts] = useState(productsApi.slice(0, 3));
  const [productCount, setProductCount] = useState(1);

  const [cartLocalStorage, setCartLocalStorage] = useLocalStorage('cart', []);
  const { setCart } = useContext(AppContext);

  const { slug } = useParams();

  const randomStart = () => {
    
    const result =  Math.floor(Math.random() * (productsApi.length - 3));

    console.log(result);
    return  result;
  };
  
  useEffect(() => {
    const currentProduct = productsApi.find(el => 
      el.id === +slug);

    if (currentProduct) {
      setProduct(currentProduct);
    }
    const start = randomStart();

    const newSameProducts = productsApi.slice(start, start + 3);
    setSameProducts(newSameProducts);
  }, [slug]);

  const navigate = useNavigate();

  const handleFeedbackTab = () => {
    setDetailsTab(false);
    setInformationTab(false);

    setFeedbackTab(true);
  };

  const handleInformationTab = () => {
    setDetailsTab(false);
    setFeedbackTab(false);

    setInformationTab(true);
  };

  const handleDetailsTab = () => {
    setFeedbackTab(false);
    setInformationTab(false);

    setDetailsTab(true);
  };

  const handleCountInc = () => {
    setProductCount(productCount + 1);
  };

  const handleCountDec = () => {
    setProductCount(productCount - 1 < 1 ? 1 : productCount - 1);
  };

  const addProducts = (n, prod) => {
    const result = [];
    for (let i = 1; i <= n; i++) {
      result.push(prod);
    }
    return result;
  };
  
  const handleAddToCart = () => {
    
    const newCartLocalStorage = [...cartLocalStorage, ...(addProducts(productCount, product))];
    
    setCartLocalStorage(newCartLocalStorage);
    setCart(newCartLocalStorage);
    handleAdd();
  };


  return (
    <div className="productCardMain">
      <div className="productCardHeader">
        
        <p className="productCardHeader__title">Товары / десерты</p>
        <div className="desktopDisplay">
          <div className="desktopDisplay__photoZone">
            <Swiper
              className="desktopDisplay__photoZone-img"
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              scrollbar={{
                hide: false,
              }}
              modules={[Scrollbar]}
            >
              <SwiperSlide className="swiper__img">
                <img
                  src={require(`../../images/Products/${product.id}.png`)}
                  alt=""
                  
                />
              </SwiperSlide>
              <SwiperSlide  className="swiper__img">
                <img
                  src={require('../../images/ProductCard/productCardPhoto.png')}
                  alt=""
                 
                />
              </SwiperSlide>
            </Swiper>
            <img
              src={require('../../images/ProductCard/sideImg1.png')}
              alt="small pie imag1"
              className="desktopDisplay__photoZone-sideImg1"
            />
            <img
              src={require('../../images/ProductCard/sideImg2.png')}
              alt="small pie image2"
              className="desktopDisplay__photoZone-sideImg2"
            />
            <img
              src={require('../../images/ProductCard/sideImg3.png')}
              alt="small pie image3"
              className="desktopDisplay__photoZone-sideImg3"
            />
            <img
              src={require('../../images/ProductCard/sideImg4.png')}
              alt="small pie image4"
              className="desktopDisplay__photoZone-sideImg4"
            />
          </div>
          <img
            src={require('../../images/ProductCard/productCardPhoto.png')}
            alt="small pie image5"
            className="desktopDisplay__photo-mobile"
          />
          <div>
            <p className="productCardHeader__title2">{product.title}</p>
            <p className="productCardHeader__price">{`Цена - ${product.price},00 $`}</p>
            <p className="productCardHeader__descriptionTitle">Описание:</p>
            <p className="productCardHeader__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
                  eiusmod tempor
            </p>
            <p className="productCardHeader__weight">
              <b>Вес</b> - 2 кг
            </p>
            <p className="productCardHeader__taste">
              <b>Вкус</b> - воздушный бисквит с шоколадной крошкой и нежными
                  ягодными нотками
            </p>
            <div className="productCardHeader__basketButtons">
              <button 
                className="productCardHeader__basketButton"
                onClick={handleAddToCart}
              >
                Добавить в корзину
              </button>
              <div className="counterBox">
                <button 
                  className="productCardHeader__counterButton"
                  onClick={handleCountDec}
                >
                  -
                </button>
                <p className="productCardHeader__counterTitle">{productCount}</p>
                <button 
                  className="productCardHeader__counterButton"
                  onClick={handleCountInc}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="productCardBlock1">
        <div className="productCardBlock1__tabs">
          <button 
            className={classNames('productCardBlock1__tabs-button',
              {'productCardBlock1__tabs-button--active': feedbackTab})
            }
      
            onClick={handleFeedbackTab}
          >
          Отзывы
          </button>
          <button 
            // eslint-disable-next-line max-len
            className={classNames('productCardBlock1__tabs-button productCardBlock1__tabs-button--mobile',
              {'productCardBlock1__tabs-button--active': detailsTab})
            }
      
            onClick={handleDetailsTab}
          >
          Подробности
          </button>
          <button 
            // eslint-disable-next-line max-len
            className={classNames('productCardBlock1__tabs-button productCardBlock1__tabs-button--desktop',
              {'productCardBlock1__tabs-button--active': informationTab})
            }
      
            onClick={handleInformationTab}
          >
          Дополнительная информация
          </button>
        </div>
      
        {feedbackTab && (
          <p className="productCardBlock1__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
          maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis
          consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor odio,
          in molestie diam bibendum sed.
          </p>
        )}

        {detailsTab && (
          <p className="productCardBlock1__text">
          some details
          </p>
        )}

        {informationTab && (
          <p className="productCardBlock1__text">
          some information
          </p>
        )}
      
      </div>

      <div className="productCardBlock2">
        <p className="productCardBlock2__title1">Похожие товары:</p>
        <div className="display">
          {sameProducts.map(el => {
            return (
              <div 
                onClick={async () => navigate(`/categories/${el.id}`)}
                key={el.id}
              >
                <ProductCardMini 
                  product={el}
                  src={require(`../../images/Products/${el.id}.png`)}
                />
              </div>
           
            );
          
          })}
        </div>
        <div className="display--onMobile">
        
          <ProductCardMini 
            product={productsApi[0]}
            src={require(`../../images/Products/${productsApi[0].id}.png`)}
            path={`${ productsApi[0].id}`}
          />
       
        </div>
      </div>

      {isProductAdd && (
        <div className="productCardHeader__notification">
          <img src={success} alt="success" />
          <div className="productCardHeader__notification-content">
            <p>Товар добавлен в корзину</p>
            <Link to="/basket">
                Перейти в корзину
            </Link>
          </div>
        </div>
      )}
    </div> 
  );
};
