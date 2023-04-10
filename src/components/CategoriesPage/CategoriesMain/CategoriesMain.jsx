import { React } from 'react';
import '../CategoriesMain/CategoriesMain.scss';
import { Link } from 'react-router-dom';
import { categoriesApi } from '../../../API/deserts';

export const CategoriesMain = () => {
  const paginationCount = [1, 2, 3, 4, 5];
  return (
    <div className="categoriesMain">
      
      <p className="categoriesMain__title">Товары / десерты</p>
      <div className="categoriesMain__boxDisplay">
        {categoriesApi.map((product) => (
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

      <div className="categoriesMain__pagination">
        <div className="categoriesMain__pagination-item categoriesMain__pagination-item--active">
          {paginationCount[0]}
        </div>
        {paginationCount.slice(1).map(el => {
          return (
            <div className="categoriesMain__pagination-item" key={el}>
              {el}
            </div>
          );
        })}
      </div>
    </div>
  );
};
