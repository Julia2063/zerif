import React from 'react';

import { ProductCardHeader } from '../components/ProductCard/ProductCardHeader/ProductCardHeader';
import { ProductCardBlock1 } from '../components/ProductCard/ProductCardBlock1/ProductCardBlock1';
import { ProductCardBlock2 } from '../components/ProductCard/ProductCardBlock2/ProductCardBlock2';


export const ProductCardPage = () => {
  return (
    <div className="productCardPage">
      <ProductCardHeader />
      <ProductCardBlock1 />
      <ProductCardBlock2 />
    </div>
  );
};
