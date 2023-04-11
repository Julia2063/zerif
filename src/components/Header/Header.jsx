import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

import classNames from 'classnames';
import downIcon from '../../images/HomePage/downIcon.svg';
import upIcon from '../../images/HomePage/upIcon.svg';
import { PageNavLink } from '../PageNavLink';

export const Header = ({ setProductCategory }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState('');

  const categories = [
    ['десерты', 'desert'],
    ['торты', 'cakes'],
    ['выпечка', 'bakery'],
    ['клубника и фрукты в шоколаде', 'strawberries and fruits in chocolate'],
    ['конфеты и шоколад', 'candy and chocolate'],
    ['мороженое', 'ice cream'],
  ];

  const toggle = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleOnClickSelect = () => {
    toggle();
  };

  const handleSelectCategory = (el) => {
    setProductCategory(el[1]);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 || event.keyCode === 27) {
      setIsSearch(false);
      setQuery('');
      if (isCategoryOpen) {
        setIsCategoryOpen(false);
      }
    }
  };

  const handleBlur = () => {
    setIsSearch(false);
    setQuery('');
  };

  const handleCloseSelectDropdown = () => {
    if (isCategoryOpen) {
      setIsCategoryOpen(false);
    }
  };

  const searchOnChange = (e) => {
    setQuery(e.target.value);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };


  const searchOpen = () => {
    setIsSearch(!isSearch);
  };

  useEffect(()  => {
    if (isOpen) {
      document.body.classList.add('overflowHidden');

    } else {
      document.body.classList.remove('overflowHidden');
    }
    
  }, [isOpen]);


  return (
    <>
      
      
      <header className="header">
        {(isOpen || isCategoryOpen) && (
          <div
            className="header__overlay"
            onClick={() => {
              handleClose();
              handleCloseSelectDropdown();
            }}
          />
        )}
        <nav className="header__nav">
          <div className={classNames('burgLog', {onMobile: isSearch})}>
            <button onClick={handleOpen} className="burgerButton">
              <img
                src={require('../../images/HomePage/burger.png')}
                alt="burger menu"
                className="header__burger"
              />
            </button>
          </div>
          <div className={classNames({onMobile: isSearch})} >
            <Link to={'/'} onClick={handleClose}>
              <img
                className="header__logo"
                src={require('../../images/HomePage/zerifIcon.png')}
                alt="main logo"
              />
            </Link>
          </div>
          
          <div className="desktopLinks" >
            <div onClick={handleCloseSelectDropdown}>
              <PageNavLink
                to={'/'}
                text="Главная"
                
              />
            </div>
            <div  onClick={handleCloseSelectDropdown}>
              <PageNavLink
                to={'/popular'}
                text="Популярное"
               
              />
            </div>
            <div 
              onClick={handleOnClickSelect}
              className="select"
              onKeyDown={handleCloseSelectDropdown}
            >
              <PageNavLink
                text="Товары"
                to="/categories"
                img={(downIcon)}
              />
              
              {isCategoryOpen && (
                <div className="select__selectDropdown">
                  {categories.map(el => {
                    return (
                      <div
                        className="select__selectDropdown-item"
                        key={el}
                        onClick={() => handleSelectCategory(el)}
                      > 
                        {`- ${el[0]}`}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div onClick={handleCloseSelectDropdown}>
              <PageNavLink
                to={'/contacts'}
                text="Контакты"
                
              />
            </div>
            {isSearch && (
              <div className="search">
                <form action="">
                  <input 
                    type="text" 
                    className="search__input" 
                    autoFocus
                    onKeyDown={(e) => handleKeyDown(e)}
                    onBlur={handleBlur}
                    value={query}
                    onChange={(e) => searchOnChange(e)}
                  />
                </form>
                {query.length > 0 && (
                  <div className="search__list">
                    <div className="search__list-item">
                      <img 
                        src={require('../../images/BasketPage/productImage.png')}
                        alt="" className="search__list-image"
                      />
                      <div className="search__list-text">
                        <p className="search__list-title">Торт с ягодами</p>
                        <p className="search__list-price">50$</p>
                      </div>
                    </div>
                    <div className="search__list-item">
                      <img 
                        src={require('../../images/BasketPage/productImage.png')}
                        alt="" className="search__list-image"
                      />
                      <div className="search__list-text">
                        <p className="search__list-title">Торт пряничный</p>
                        <p className="search__list-price">40$</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            
          </div>

          
          <div className="iconBox">
            {!isSearch && (
              <Link onClick={() => {
                searchOpen();
                handleClose();
                handleCloseSelectDropdown();
              } }>
                <img
                  src={require('../../images/HomePage/searchIcon.png')}
                  alt="search"
                />
              </Link>
            )}
            

            <Link to={'/phone'} onClick={() => {
              handleClose();
              handleCloseSelectDropdown();
            }}>
              <img
                src={require('../../images/HomePage/phoneIcon.png')}
                alt="phone"
              />
            </Link>

            <Link to={'/account'} onClick={() => {
              handleClose();
              handleCloseSelectDropdown();
            }}>
              <img
                src={require('../../images/HomePage/personIcon.png')}
                alt="account"
              />
            </Link>

            <Link to={'/basket'} onClick={() => {
              handleClose();
              handleCloseSelectDropdown();
            }}>
              <img
                src={require('../../images/HomePage/basketIcon.png')}
                alt="basket"
              />
            </Link>
          </div>

          <div className="language select">
            <p className="language__text">Ru</p>
            <img 
              src={downIcon} 
              alt="" 
              className="language__icon"
            />
          </div>
        </nav>
       
      </header>

      {isOpen && (
        
         
        <div className="burgerMenu">
          <button className="closeButton">
            <img
              src={require('../../images/HomePage/closeIcon.png')}
              alt="close button"
              onClick={handleClose} />
          </button>
          <div className="desctopLinksBurger">
            <div onClick={() => {
              handleCloseSelectDropdown();
              handleClose();
            } }>
              <PageNavLink
                to={'/'}
                text="Главная" />
            </div>
            <div onClick={() => {
              handleCloseSelectDropdown();
              handleClose();
            } }>
              <PageNavLink
                to={'/popular'}
                text="Популярное" />
            </div>
            <div
              onClick={handleOnClickSelect}
              className="select--burger"
              onKeyDown={handleCloseSelectDropdown}
            >
              <PageNavLink
                text="Товары"
                to="/categories"
                img={isCategoryOpen ? upIcon : downIcon} />
              {isCategoryOpen && (
                <div className="select__selectDropdown">
                  {categories.map(el => {
                    return (
                      <div
                        className="select__selectDropdown-item"
                        key={el}
                        onClick={() => {
                          handleSelectCategory(el);
                          setIsOpen(false);
                        } }
                      >
                        {`- ${el[0]}`}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>



            <div onClick={() => {
              handleCloseSelectDropdown();
              handleClose();
            } }>
              <PageNavLink
                to={'/contacts'}
                text="Контакты" />
            </div>
            {isSearch && (
              <div className="search">
                <form action="">
                  <input
                    type="text"
                    className="search__input"
                    autoFocus
                    onKeyDown={(e) => handleKeyDown(e)}
                    onBlur={handleBlur}
                    value={query}
                    onChange={(e) => searchOnChange(e)} />
                </form>
                {query.length > 0 && (
                  <div className="search__list">
                    <div className="search__list-item">
                      <img
                        src={require('../../images/BasketPage/productImage.png')}
                        alt="" className="search__list-image" />
                      <div className="search__list-text">
                        <p className="search__list-title">Торт с ягодами</p>
                        <p className="search__list-price">50$</p>
                      </div>
                    </div>
                    <div className="search__list-item">
                      <img
                        src={require('../../images/BasketPage/productImage.png')}
                        alt="" className="search__list-image" />
                      <div className="search__list-text">
                        <p className="search__list-title">Торт пряничный</p>
                        <p className="search__list-price">40$</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
    
      )}
    </>
  );
};
