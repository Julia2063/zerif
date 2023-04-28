import React, { useContext } from 'react';

import './PageNavigation.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../AppProvider';
import { getRightData } from '../../helpers/getrRightData';

export const PageNavigation = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter(el => el).slice(1);

  const { slug } = useParams();

  const { productsApi } = useContext(AppContext);

  const { t, i18n } = useTranslation();

  return (
    <ul className="pageNavigation">
      <li>
        {pathnames.length > 0
          ? (
            <Link to="/categories">
              <p>{t('navigation.goods')}</p> 
            </Link> 
          ) : <p>{t('navigation.goods')}</p>
        }
        
      </li>

      {pathnames.map((pathname, index) => {
        const routeTo = `/categories/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const currentLocation = () => {
          switch (pathname) {
          case 'desert':
            return t('categories.deserts');

          case 'cakes':
            return t('categories.cakes');

          case 'bakery':
            return t('categories.bakery');

          case 'in-chocolate':
            return t('categories.in-chocolate');

          case  'candy-and-chocolate':
            return t('categories.candy-and-chocolate');

          case 'ice-cream':
            return t('categories.ice-cream');

          default:
            return pathname;
          }
        };
        return isLast ? (
          <li key={pathname}>
            <p>{' / '}</p>
            <p>
              {slug 
                ? `${getRightData(
                  productsApi.find(el => el.path === slug), i18n.language, 'title'
                )}` 
                : `${currentLocation()}`}
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