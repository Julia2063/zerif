import React, { useState, useMemo } from 'react';

export const AppContext = React.createContext({
  user: null,
  setUser: () => {},
});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const contextValue = useMemo(() => {
    return {
      user,
      setUser,
    };
  }, [user]) ;

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};