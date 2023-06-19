import React from 'react';

import { Link } from 'react-router-dom';
import './ProductCardMini.scss';

import { useTranslation } from 'react-i18next';
import noPhoto from '../../images/ProductForm/noPhoto.svg';
import { getRightData } from '../../helpers/getrRightData';

export const ProductCardMini = ({ product, path}) => {
  const { i18n } = useTranslation();

  return (
    <Link 
      to={path}
      className="productCardMini"
    >
      <div className="productCardMini__box" >
        <img
          src={product?.image || noPhoto}
          alt=""
          className="productCardMini__img"
        />
        <p className="productCardMini__productTitle">
          {getRightData(product, i18n.language, 'title')}
        </p>
        <p className="productCardMini__price">{`${product?.price},00 AZN`}</p>
      </div>
    </Link>
  );
};
