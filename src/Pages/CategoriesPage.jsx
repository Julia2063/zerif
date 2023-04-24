import { React } from 'react';
// eslint-disable-next-line max-len
import { CategoriesMain } from '../components/CategoriesPage/CategoriesMain/CategoriesMain';

export const CategoriesPage = ({ productCategory }) => {
  return (
    <CategoriesMain productCategory={productCategory} />
  );
};
