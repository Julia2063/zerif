import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import './PageNavLink.scss';

export const PageNavLink = ({ to, text, img, handleClick, handleClose }) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames(
      'pageNavLink', { 'pageNavLink--active': isActive },
    )}
  >
    <p onClick={handleClose}>{text}</p> 
    {img && (
      <button onClick={handleClick}>
        <img 
          src={img} 
          alt="arrowDown" 
        />
      </button>
    )}
    
  </NavLink>
);