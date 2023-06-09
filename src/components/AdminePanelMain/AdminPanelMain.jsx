import { React, useContext, useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { AppContext } from '../AppProvider';

import './AdminPanelMain.scss';
import { 
  deleteObjectFromeStorage,
  removeDocumentFromCollection,
} from '../../helpers/firebaseControls';
import { ModalWithForm } from '../ModalWithForm';
import { ProductForm } from '../ProductForm';
import { db } from '../../firebase';

import noPhoto from '../../images/ProductForm/noPhoto.svg';

export const AdminPanelMain = () => {
  const { setUser, setUserInfo } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);


  const [showModal, setShowModal] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  console.log(products);
 
  const auth = getAuth();

  useEffect(() => {
    db.collection('products').onSnapshot(snapshot => {
      setProducts(snapshot.docs.map(doc => doc.data()));
    });
  }, [fetchCount]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      setUserInfo(null);

    }).catch((error) => {
      console.log(error);
    });
  };

  const handleShowModal = (el) => {
    setShowModal(true);
    setCurrentProduct(el); 
  };

  const handleProductDelete = async (product) => {
    try {
      await removeDocumentFromCollection('products', product.idPost);
      if (product.image.length > 0 || product.images.length > 0) {
        await deleteObjectFromeStorage(product);
      }
      setFetchCount(fetchCount + 1);
    } catch (error) {
      alert(error);
    }
  };

  const handleShowModalAdd = () => {
    setShowModalAdd(true);
  };
  
  return (
    <div className="adminPanelmain">
      <h1>Панель Администратора</h1>
      <div className="adminPanelmain__products">
        <div className="adminPanelmain__products-item">
          <p>Фото</p>
          <p>Название</p>
          <p>Цена</p>
          <p>Тип товара</p>
          <p></p>
          <p></p>
        </div>
        {products.sort((a, b) => {
         
          return new Date(a.dateCreating) - new Date(b.dateCreating);
        }).map(el => {
          return (
            <div className="adminPanelmain__products-item" key={el.id}>
              <img src={el.image || noPhoto} alt="product__image" />
              <p>{el.ru.title}</p>
              <p>{el.price}</p>
              <p>{el.type}</p>
              <button 
                onClick={() => handleShowModal(el)} 
              >
                Изменить
              </button>
              <button
                onClick={() => handleProductDelete(el)}
              >
                Удалить
              </button>
            </div>
          );
        })}
      </div>
      <button
        className="adminPanelmain__button--add adminPanelmain__button"
        onClick={handleShowModalAdd}
      >
        +
      </button>
      <button 
        className="adminPanelmain__button--logout adminPanelmain__button"
        onClick={handleSignOut}
      >
        Выход
      </button>

      {showModal && (
        <ModalWithForm
          title="Карточка изменения товара"
          setShowModalWithForm={setShowModal}
          form={
            <ProductForm
              setShowModalWithForm={setShowModal}
              product={currentProduct}
              setFetchCount={setFetchCount}
              fetchCount={fetchCount}
              func="updateProduct"
            />
          }
        />
      )}  
      {showModalAdd && (
        <ModalWithForm
          title="Карточка добавления товара"
          setShowModalWithForm={setShowModalAdd}
          form={
            <ProductForm
              setShowModalWithForm={setShowModalAdd}
              
              setFetchCount={setFetchCount}
              fetchCount={fetchCount}
              func="addProduct"
            />
          }
        />
      )}  
    </div>
  );
};