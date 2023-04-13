import React, { useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/App.scss';
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

function App () {
  const [productCategory, setProductCategory] = useState(null);

  const { user } = useContext(AppContext);

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
        <Route path="/account" element={user ? <AccountInformationPage /> : <AccountEnterPage />}/>
        <Route 
          path="/account/information" 
          element={<AccountInformationPage />}
        />
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
