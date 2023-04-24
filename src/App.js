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
import { getCollection, getCollectionWhereKeyValue } from './helpers/firebaseControls';
import { AdminPanelPage } from './Pages/AdminPanelPage';



function App () {
  const auth = getAuth();
  const [productCategory, setProductCategory] = useState(null);

  // eslint-disable-next-line max-len
  const { user, setCart, setUser, userInfo, setUserInfo, productsApi, setProductsApi } = useContext(AppContext);
  const [cartLocalStorage] = useLocalStorage('cart', []);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserData = async () => {
    try {
      const currentUserInfo = 
        await getCollectionWhereKeyValue('users', 'uid', auth.currentUser.uid);
      setUserInfo(currentUserInfo[0]);
      const loadedProducts = 
        await getCollection('products');
      setProductsApi(loadedProducts);
      console.log(productsApi);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const loadedProducts = 
        await getCollection('products');
      setProductsApi(loadedProducts);
      console.log(productsApi);
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setUser(user);
        fetchUserData();
        fetchData();
      } else {
        fetchData();
      }
    });

  }, [auth.currentUser]);

  useEffect(() => {
    setIsAdmin(userInfo?.role === 'admin');
    
  }, [userInfo, user]);
  
  useEffect(() => {
    setCart(cartLocalStorage);
  }, [cartLocalStorage]);

  return (
    <div className="app">
      {!isAdmin 
        ? (
          <><Header
            setProductCategory={setProductCategory} />
          <ScrollToTop />
          <Routes>
            <Route
              path="*"
              element={<Navigate to="/categories" replace />}
            />
            <Route path="/" element={<HomePage />} />
            <Route path="/popular" element={<PopularPage />} />
            <Route path="/categories">
              <Route index element={<CategoriesPage />} />
              <Route path={`/categories/${productCategory}`}  >
                <Route index element={ <CategoriesPage productCategory={productCategory} />} />
                <Route path=":slug" element={<ProductCardPage />} />
              </Route>
              <Route path=":slug" element={<ProductCardPage />} />
            </Route>
            <Route path="/contacts" element={<ContactsPage />} />
            <Route
              path="/account"
            >
              <Route
                index
                element={user
                  ? <AccountInformationPage />
                  : <Navigate to="/account/registration" replace />} />

              <Route path="/account/login" element={<AccountEnterPage isRegister={false} />} />
              <Route 
                path="/account/registration" 
                element={<AccountEnterPage isRegister={true} />} 
              />

            </Route>
            <Route path="/basket">
              <Route index element={<BasketPage />} />
              <Route path="/basket/order" element={<BasketOrderPage />} />
            </Route>


          </Routes><Footer /></>

        )
        : (
          <AdminPanelPage />
        )}
    </div>
  );
}

export default App;
