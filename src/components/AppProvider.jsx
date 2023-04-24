import React, { useState } from 'react';

export const AppContext = React.createContext({
  user: null,
  setUser: () => {},
  userInfo: null,
  setUserInfo: () => {},
  cart: [],
  setCart: () => {},
  productsApi: [],
  setProductsApi: () => {},
  language: null,
  setLanguage: () => {},
});

export const AppProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [cart, setCart] = useState([]);
  const [productsApi, setProductsApi] = useState([]);
  const [language, setLanguage] = useState('ru');


  const contextValue =  {
    user,
    setUser,
    userInfo,
    setUserInfo,
    cart, 
    setCart,
    productsApi,
    setProductsApi,
    language,
    setLanguage,
  };


  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};