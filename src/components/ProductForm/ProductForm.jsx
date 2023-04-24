import React, { useEffect, useState, useRef } from 'react';

import './ProductForm.scss';
import { 
  createNewOrder,
  createNewProduct,
  deleteObjectFromeStorage, 
  updateDocumentInCollection, 
  uploadFileToStorage,
} from '../../helpers/firebaseControls';

import photo from '../../images/AccountInformation/photo.svg';
import addPhoto from '../../images/AccountInformation/addPhoto.svg';

export const ProductForm = ({ 
  setFetchCount,
  setShowModalWithForm,
  product,
  fetchCount,
  func,
}) => {

  const [newDataModal, setNewDataModal] = useState({});
  const [file, setFile] = useState(null);

  const inputRef = useRef();

  const selectOptions = [
    'desert', 
    'cakes', 
    'bakery', 
    'in-chocolate',
    'candy-and-chocolate', 
    'ice-cream',
  ];
  
  console.log(newDataModal);
  console.log(fetchCount);
 
  

  useEffect(() => {
    setNewDataModal({
      image: product?.image, 
      title: product?.title, 
      price: product?.price, 
      type: product?.type || selectOptions[0],
    });
  }, []);

  const handleChangeModal = (fieldName, newValue) => {
    setNewDataModal({
      ...newDataModal,
      [fieldName]: newValue,
    });
  };

  const handleSubmitModal = func === 'updateProduct' ? (
    async (e) => {
      e.preventDefault();    

    
      const oldProductData = Object.values({
        title: product.title, 
        price: product.price, 
        type: product.type });
      const newProductData = Object.values(newDataModal).slice(1);

      if (oldProductData.some((el, i) => el !== newProductData[i])) {
        try {
        
          await updateDocumentInCollection('products', {
            ...product, 
            title: newDataModal.title,
            price: newDataModal.price,
            type: newDataModal.type,
          }, product.idPost);
          setFetchCount(fetchCount + 1);
        } catch (error) {
          alert(error);
        }
      }

      if (file) {
        try {
          await uploadFileToStorage(file, product);
          await deleteObjectFromeStorage(product);
          setTimeout(() => {
            console.log('fetchCount');
            setFetchCount(fetchCount + 1);
          }, 1000);
        } catch (error) {
          console.log(error);
          alert(error);
        }
      }
  
      setShowModalWithForm(false);
    })
    : (
      async (e) => {
        e.preventDefault(); 
        try {
          await createNewProduct(newDataModal, file);
          setFetchCount(fetchCount + 1);

          setShowModalWithForm(false);
        } catch (error) {
          alert(error);
        }
      }
    );

  const handleChangePhoto = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewDataModal({...newDataModal, image: reader.result});
      
      };
    
      reader.readAsDataURL(e.target.files[0]);
      inputRef.current.focus();
    }
  };

  console.log(fetchCount);

  return (
    <form onSubmit={(e) => handleSubmitModal(e)}>
      <div className="productForm__img">
        <img 
          src={newDataModal.image || addPhoto} 
          alt="product__image"
        />
        <div  
          className="productForm__file" 
        >
          <img src={photo} alt="" /> 
          
        </div>

        <input
          type="file"
          onChange={(e) => handleChangePhoto(e)}
        />
      </div>
     
      <input
        type="text"
        value={newDataModal.title}
        placeholder="Название"
        className="productForm__input"
        onChange={(e) => handleChangeModal('title', e.target.value)} 
        autoFocus
        ref={inputRef}
      />
      <input
        type="text"
        value={newDataModal.price}
        placeholder="цена"
        className="productForm__input"
        onChange={(e) => handleChangeModal('price', e.target.value)} 
      />
      <button hidden></button>
      <select
        type="text"
        value={newDataModal.type}
        
        className="productForm__input"
        onChange={(e) => {
          handleChangeModal('type', e.target.value);
          inputRef.current.focus();
        }} 
      >
        {selectOptions.map(el => {
          return (
            <option value={el} key={el}>{el}</option>
          );
        })}
      </select>
      <button hidden></button>
    </form>
  );
};