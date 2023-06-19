import React, { useState, useEffect, useContext } from 'react';
import './ProductCardMain.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import success from '../../images/BasketPage/success.svg';



import 'swiper/scss';

import '../../styles/swiperScrollBar.scss';
import { ProductCardMini } from '../ProductCardMini/ProductCardMini';
import { useLocalStorage } from '../../helpers/useLocalStorage';
import { AppContext } from '../AppProvider';
import { PageNavigation } from '../PageNavigation/PageNavigation';

import noPhoto from '../../images/ProductForm/noPhoto.svg';
import { getRightData } from '../../helpers/getrRightData';


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
  const { setCart, productsApi } = useContext(AppContext);

  const [sameProducts, setSameProducts] = useState(productsApi.slice(0, 3));
  const [productCount, setProductCount] = useState(1);

  const [cartLocalStorage, setCartLocalStorage] = useLocalStorage('cart', []);
  

  const { slug } = useParams();

  const { t, i18n } = useTranslation();

  const randomStart = () => {
    
    const result =  Math.floor(Math.random() * (productsApi.length - 3));

    return  result;
  };
  
  useEffect(() => {
    const currentProduct = productsApi.find(el => 
      el.path === slug);

    if (currentProduct) {
      setProduct(currentProduct);
    }
    const start = randomStart();

    const newSameProducts = productsApi.slice(start, start + 3);
    setSameProducts(newSameProducts);
    setProductCount(1);

  }, [slug, productsApi]);

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
        <PageNavigation />
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
                  src={product.image || noPhoto}
                  alt="slide_image"
                />
              </SwiperSlide>
              {product.images?.map(el => {
                return (
                  <SwiperSlide className="swiper__img" key={el}>
                    <img
                      src={el}
                      alt="slide_image"
                  
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {product.images?.map(el => {
              return (
                <img
                  key={el}
                  src={el}
                  alt="small_product_image"
                  className="desktopDisplay__photoZone-sideImg"
                />
              );
            })}
            
          </div>
          <img
            src={product.image || noPhoto}
            alt="small pie image5"
            className="desktopDisplay__photo-mobile"
          />
          <div>
            <p className="productCardHeader__title2">
              {getRightData(productsApi.find(el => 
                el.path === slug), i18n.language, 'title')}
            </p>
            <p className="productCardHeader__price">{`${t('price')} - ${product.price},00 AZN`}</p>
            <p className="productCardHeader__descriptionTitle">{`${t('description')}:`}</p>
            <p className="productCardHeader__description">
              {getRightData(productsApi.find(el => 
                el.path === slug), i18n.language, 'description')}
            </p>
            <p className="productCardHeader__weight">
              <b>{t('weight')}</b> {` - ${product.weight / 1000} ${t('kg')}`}
            </p>
            <p className="productCardHeader__taste">
              <b>{t('taste')}</b> 
              {` - ${getRightData(productsApi.find(el => 
                el.path === slug), i18n.language, 'taste')}`}
            </p>
            <div className="productCardHeader__basketButtons">
              <button 
                className="productCardHeader__basketButton"
                onClick={handleAddToCart}
              >
                {t('addToBasket')}
              </button>
              <div className="counterBox">
                <button 
                  className="productCardHeader__counterButton"
                  onClick={handleCountDec}
                >
                  -
                </button>
                <p className="productCardHeader__counterTitle">
                  {productCount > product.count ? product.count : productCount}
                </p>
                <button 
                  className="productCardHeader__counterButton"
                  onClick={handleCountInc}
                  disabled={productCount >= product.count}
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
            {t('feedback')}
          </button>
          <button 
            // eslint-disable-next-line max-len
            className={classNames('productCardBlock1__tabs-button productCardBlock1__tabs-button--mobile',
              {'productCardBlock1__tabs-button--active': detailsTab})
            }
      
            onClick={handleDetailsTab}
          >
            {t('details')}
          </button>
          <button 
            // eslint-disable-next-line max-len
            className={classNames('productCardBlock1__tabs-button productCardBlock1__tabs-button--desktop',
              {'productCardBlock1__tabs-button--active': informationTab})
            }
      
            onClick={handleInformationTab}
          >
            {t('moreInformation')}
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
        <p className="productCardBlock2__title1">{`${t('similar')}:`}</p>
        <div className="display">
          {sameProducts.map(el => {
            return (
              <div 
                onClick={async () => navigate(`/categories/${el.path}`)}
                key={el.id}
              >
                <ProductCardMini 
                  product={el}
                />
              </div>
           
            );
          
          })}
        </div>
        <div className="display--onMobile">
        
          <ProductCardMini 
            product={productsApi[0]}
            path={`${ productsApi[0]?.path}`}
          />
       
        </div>
      </div>

      {isProductAdd && (
        <div className="productCardHeader__notification">
          <img src={success} alt="success" />
          <div className="productCardHeader__notification-content">
            <p>{t('added')}</p>
            <Link to="/basket">
              {t('goToBasket')}
            </Link>
          </div>
        </div>
      )}
    </div> 
  );
};
