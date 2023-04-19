import { React, useEffect, useState } from 'react';
import '../CategoriesMain/CategoriesMain.scss';
import classNames from 'classnames';
import { productsApi } from '../../../API/deserts';
import { ProductCardMini } from '../../ProductCardMini/ProductCardMini';


export const CategoriesMain = () => {
  const [products, setProducts] = useState(productsApi);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const paginationCount = [];

 
  for (let i = 1; i <= Math.ceil(productsApi.length / productsPerPage); i++) {
    paginationCount.push(i);
  }
  
  

  useEffect(() => {
    const lastProductIndex = currentPage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;
   
    const currentProducts = productsApi.slice(firstProductIndex, lastProductIndex);

    setProducts(currentProducts);
    window.scrollTo(0, 0);

  }, [currentPage]);
 
  const paginate = pageNumber => setCurrentPage(pageNumber);


  return (
    <div className="categoriesMain">
      
      <p className="categoriesMain__title">Товары / десерты</p>
      <div className="categoriesMain__boxDisplay">
        {products.map(product => (
          <ProductCardMini 
            product={product}
            src={require(`../../../images/Products/${product.id}.png`)}
            path={`${ product.id}`}
            key={product.id}
          />
        ))}
      </div>

      {paginationCount.length > 1 && (
        <div className="categoriesMain__pagination">
  
          {paginationCount.map(el => {
            return (
              <div 
                className={classNames(
                  'categoriesMain__pagination-item', 
                  {'categoriesMain__pagination-item--active': currentPage === el}
                )}
              
                key={el}
                onClick={() => paginate(el)}
              >
                {el}
              </div>
            );
          })}
        </div>
      )}
      
    </div>
  );
};
