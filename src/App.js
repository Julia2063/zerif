import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './styles/App.scss';
import { getAuth } from 'firebase/auth';
import { HomePage } from './Pages/HomePage';
import { PopularPage } from './Pages/PopularPage';
import { ProductCardPage } from './Pages/ProductCardPage';
import { CategoriesPage } from './Pages/CategoriesPage';
import { ContactsPage } from './Pages/ContactsPage';
import { AccountEnterPage } from './Pages/AccountEnterPage';
import { AccountInformationPage } from './Pages/AccountInformationPage';
import { BasketPage } from './Pages/BasketPage';
import { BasketOrderPage } from './Pages/BasketOrderPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer/';
import { AppContext } from './components/AppProvider';

import ScrollToTop from './components/ScrollToTop';
import { useLocalStorage } from './helpers/useLocalStorage';
import { getCollectionWhereKeyValue } from './helpers/firebaseControls';



function App () {
  const auth = getAuth();
  const [productCategory, setProductCategory] = useState(null);

  const { user, setCart, setUser, userInfo, setUserInfo } = useContext(AppContext);
  const [cartLocalStorage] = useLocalStorage('cart', []);

  const fetchData = async () => {
    try {
      const currentUserInfo = 
        await getCollectionWhereKeyValue('users', 'uid', auth.currentUser.uid);
      setUserInfo(currentUserInfo[0]);
      console.log('hgvhjbvj');
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        return setUser(user);
      }
    });

    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [auth.currentUser]);

  console.log(userInfo);
  
  useEffect(() => {
    setCart(cartLocalStorage);
  }, [cartLocalStorage]);
  
  console.log(user);
  console.log(productCategory);


  return (
    <div className="app">
      <Header 
        setProductCategory={setProductCategory} 
      />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/popular" element={<PopularPage />}/>
        <Route path="/categories">
          <Route index  element={<CategoriesPage />} />
          <Route path=":slug" element={<ProductCardPage />} />
        </Route>
        <Route path="/contacts" element={<ContactsPage />}/>
        <Route 
          path="/account" 
        >
          <Route 
            index
            element={
              user ? <AccountInformationPage /> : <Navigate to="/account/registration" replace />
            }
          />

          <Route path="/account/login" element={<AccountEnterPage isRegister={false}/>} />
          <Route path="/account/registration" element={<AccountEnterPage isRegister={true}/>} />

        </Route>
        <Route path="/basket">
          <Route index element={<BasketPage/>} />
          <Route path="/basket/order" element={<BasketOrderPage />}/>
        </Route>

        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
