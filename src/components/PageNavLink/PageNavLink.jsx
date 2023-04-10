import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import './PageNavLink.scss';

export const PageNavLink = ({ to, text, img }) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames(
      'pageNavLink', { 'pageNavLink--active': isActive },
    )}
  >
    <p>{text}</p> 
    {img && (
      <img 
        src={img} 
        alt="arrowDown" 
      />
    )}
    
  </NavLink>
);