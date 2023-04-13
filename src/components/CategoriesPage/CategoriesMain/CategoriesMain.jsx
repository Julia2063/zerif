import { React, useEffect, useState } from 'react';
import '../CategoriesMain/CategoriesMain.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { categoriesApi } from '../../../API/deserts';

export const CategoriesMain = () => {
  const [products, setProducts] = useState(categoriesApi);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const paginationCount = [];

 
  for (let i = 1; i <= Math.ceil(categoriesApi.length / productsPerPage); i++) {
    paginationCount.push(i);
  }
  
  

  useEffect(() => {
    const lastProductIndex = currentPage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;
   
    const currentProducts = categoriesApi.slice(firstProductIndex, lastProductIndex);

    setProducts(currentProducts);

  }, [currentPage]);
 
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="categoriesMain">
      
      <p className="categoriesMain__title">Товары / десерты</p>
      <div className="categoriesMain__boxDisplay">
        {products.map((product) => (
          <Link to={`${ product.id}`} key={product.id}>
            <div className="categoriesMain__box" >
              <img
                src={require(`../../../images/Categories/Pagination/${product.id}.png`)}
                alt=""
                className="categoriesMain__img"
              />
              <p className="categoriesMain__productTitle">{product.title}</p>
              <p className="categoriesMain__price">{product.price}</p>
            </div>
          </Link>
         
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
