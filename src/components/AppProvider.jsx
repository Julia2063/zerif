import React, { useState } from 'react';

export const AppContext = React.createContext({
  user: null,
  setUser: () => {},
  userInfo: null,
  setUserInfo: () => {},
  cart: [],
  setCart: () => {},

});

export const AppProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null)
  const [cart, setCart] = useState([]);


  const contextValue =  {
    user,
    setUser,
    userInfo,
    setUserInfo,
    cart, 
    setCart,
  };


  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};