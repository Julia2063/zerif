import React, { useContext } from 'react';

import './PageNavigation.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AppContext } from '../AppProvider';

export const PageNavigation = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter(el => el).slice(1);

  const { slug } = useParams();

  const { productsApi } = useContext(AppContext);

  return (
    <ul className="pageNavigation">
      <li>
        {pathnames.length > 0
          ? (
            <Link to="/categories">
              <p>Товары</p> 
            </Link> 
          ) : <p>Товары</p>
        }
        
      </li>

      {pathnames.map((pathname, index) => {
        const routeTo = `/categories/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const currentLocation = () => {
          switch (pathname) {
          case 'desert':
            return 'Десерты';

          case 'cakes':
            return 'Торты';

          case 'bakery':
            return 'Выпечка';

          case 'in-chocolate':
            return 'Клубника и фрукты в шоколаде';

          case  'candy-and-chocolate':
            return 'Конфеты и шоколад';

          case 'ice-cream':
            return 'Мороженое';

          default:
            return pathname;
          }
        };
        return isLast ? (
          <li key={pathname}>
            <p>{' / '}</p>
            <p>
              {slug ? `${productsApi.find(el => el.id === slug)?.title}` : `${currentLocation()}`}
            </p>
          </li>
        ) : (
          <li key={pathname}>
            <p>
              <Link  to={routeTo}>
                {`/ ${currentLocation()}`}
              </Link>
            </p>
          </li> 
        );
      })}
    </ul>
  );
};