import { React, useContext, useEffect, useState } from 'react';
import './CategoriesMain.scss';
import classNames from 'classnames';
import { ProductCardMini } from '../ProductCardMini/ProductCardMini';
import { AppContext } from '../AppProvider';
import { PageNavigation } from '../PageNavigation/PageNavigation';


export const CategoriesMain = ({ productCategory }) => {
 
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const pagination = [];
  const [paginationCount, setPaginationCount] = useState([]);
  const { productsApi } = useContext(AppContext);
  

  useEffect(() => {
    setProducts(productsApi);
  }, []);

 

  useEffect(() => {
    const lastProductIndex = currentPage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;

    if (productCategory) {
      const visibleProducts = productsApi.filter(el => el.type === productCategory);
      const currentProducts = visibleProducts.slice(firstProductIndex, lastProductIndex);

      for (let i = 1; i <= Math.ceil(visibleProducts.length / productsPerPage); i++) {
        pagination.push(i);
      }
      setPaginationCount(pagination);

      setProducts(currentProducts);
        
    } else {
      const currentProducts = productsApi.slice(firstProductIndex, lastProductIndex);

      for (let i = 1; i <= Math.ceil(productsApi.length / productsPerPage); i++) {
        pagination.push(i);
      }

      setPaginationCount(pagination);

      setProducts(currentProducts);
    }
    
    window.scrollTo(0, 0);

  }, [productsApi, currentPage, productCategory]);
 
  const paginate = pageNumber => setCurrentPage(pageNumber);


  return (
    
    <div className="categoriesMain">

      <PageNavigation />
      <div className="categoriesMain__boxDisplay">
        {products.sort((a, b) => {
         
          return new Date(b.dateCreating) - new Date(a.dateCreating);
        }).map(product => (
          <ProductCardMini 
            product={product}
            path={`${product.path}`}
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
