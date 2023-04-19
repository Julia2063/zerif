import React from 'react';

import { Link } from 'react-router-dom';
import './ProductCardMini.scss';

export const ProductCardMini = ({ product, src, path}) => {
  return (
    <Link 
      to={path}
      className="productCardMini"
    >
      <div className="productCardMini__box" >
        <img
          src={src}
          alt=""
          className="productCardMini__img"
        />
        <p className="productCardMini__productTitle">{product.title}</p>
        <p className="productCardMini__price">{`$ ${product.price},00`}</p>
      </div>
    </Link>
  );
};
