import React, { useEffect, useState, useRef } from 'react';

import './ProductForm.scss';
import classNames from 'classnames';
import { 
  createNewProduct,
  deleteImageFromStorage,
  updateDocumentInCollection, 
  updateFieldInDocumentInCollection, 
  uploadFileToStorage,
  uploadFileToStoragesFolder,
} from '../../helpers/firebaseControls';

import photo from '../../images/ProductForm/photo.svg';
import addMainPhoto from '../../images/ProductForm/addMainPhoto.svg';
import addPhotos from '../../images/ProductForm/addPhotos.svg';

export const ProductForm = ({ 
  setFetchCount,
  setShowModalWithForm,
  product,
  fetchCount,
  func,
}) => {

  const selectOptions = [
    'deserts', 
    'cakes', 
    'bakery', 
    'in-chocolate',
    'candy-and-chocolate', 
    'ice-cream',
  ];

  const [newDataModal, setNewDataModal] = useState({
    image: '', 
    
    images: [],
    ru: {
      title: '', 
      description: '',
      taste: '',
    },
    en: {
      title: '', 
      description: '',
      taste: '',
    },
    az: {
      title: '', 
      description: '',
      taste: '',
    },
    price: '', 
    weight: '',
    count: '',
    path: '',
    type: selectOptions[0],
  });

  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [tabsState, setTabsState] = useState({
    ru: true,
    en: false,
    az: false,
  });

  const inputRef = useRef();

  useEffect(() => {
    setNewDataModal({
      image: product?.image || '', 
      
      images: product?.images || [],
      ru: {
        title: product?.ru.title || '', 
        description: product?.ru.description || '',
        taste: product?.ru.taste || '',
      },
      en: {
        title: product?.en.title || '', 
        description: product?.en.description || '',
        taste: product?.en.taste || '',
      },
      az: {
        title: product?.az.title || '', 
        description: product?.az.description || '',
        taste: product?.az.taste || '',
      },
      price: product?.price || '', 
      weight: product?.weight || '',
      count: product?.count || 1,
      path: product?.path.split('-').slice(1).join('-') || '',
      type: product?.type || selectOptions[0],
    });
  }, []);

  const handleChangeModal = (fieldName, newValue) => {
    setNewDataModal({
      ...newDataModal,
      [fieldName]: newValue,
    });
  };

  const handleChangeModalWithLang = (fieldName, newValue, lang) => {
    setNewDataModal({
      ...newDataModal,
      [lang]: {...newDataModal[lang],  [fieldName]: newValue} ,
    });
  };

  const handleSubmitModal = func === 'updateProduct' ? (
    async (e) => {
      e.preventDefault();    
   
      const oldProductData = Object.values({
        titleRu: product.ru.title, 
        descriptionRu: product.ru.description,
        tasteRu: product.ru.taste,
        
        titleEn: product.en.title, 
        descriptionEn: product.en.description,
        tasteEn: product.en.taste,

        titleAz: product.az.title, 
        descriptionAz: product.az.description,
        tasteAz: product.az.taste,

        price: product.price, 
        weight: product.weight,
        count: product.count,
        path: product.path.split('-').slice(1).join('-'),
        type: product.type });

      const newProductData = Object.values({
        titleRu: newDataModal.ru.title, 
        descriptionRu: newDataModal.ru.description,
        tasteRu: newDataModal.ru.taste,
        
        titleEn: newDataModal.en.title, 
        descriptionEn: newDataModal.en.description,
        tasteEn: newDataModal.en.taste,

        titleAz: newDataModal.az.title, 
        descriptionAz: newDataModal.az.description,
        tasteAz: newDataModal.az.taste,

        price: newDataModal.price, 
        weight: newDataModal.weight,
        count: newDataModal.count,
        path: newDataModal.path,
        type: newDataModal.type,
      });

      if (oldProductData.some((el, i) => el !== newProductData[i])) {
        console.log(newDataModal);
        try {
        
          await updateDocumentInCollection('products', {
            ...product, 
            ru: {
              title: newDataModal.ru.title, 
              description: newDataModal.ru.description,
              taste: newDataModal.ru.taste,
            },

            en: {
              title: newDataModal.en.title, 
              description: newDataModal.en.description,
              taste: newDataModal.en.taste,
            },

            az: {
              title: newDataModal.az.title, 
              description: newDataModal.az.description,
              taste: newDataModal.az.taste,
            },

            price: newDataModal.price, 
            weight: newDataModal.weight,
            count: newDataModal.count,
            path: newDataModal.path.length > 0 
              ? `${product.id}-${newDataModal.path}` 
              : `${product.id}`,
            type: newDataModal.type,
            
          }, product.idPost);

          setFetchCount(fetchCount + 1);
        } catch (error) {
          alert(error);
        }
      }

      if (file) {
        try {
          if (product.image.length > 0 || product.images.length > 0) {
            await deleteImageFromStorage(product.image);
          }
          
          await uploadFileToStorage(file, product);
          
          setFetchCount(fetchCount + 1);
        } catch (error) {
          console.log(error);
          alert(error);
        }
      }

      if ((product.images.length !== newDataModal.images.length) && files.length === 0) {
        try {
          await updateFieldInDocumentInCollection(
            'products', product.idPost, 'images', newDataModal.images
          );
          const deletedImages = product.images.filter(el => !newDataModal.images.includes(el));

          deletedImages.forEach(el => deleteImageFromStorage(el));
        } catch (error) {
          console.log(error);
          alert(error);
        }
      }

      if (files.length > 0) {
        try {
          const restedImages = product.images.filter(el => newDataModal.images.includes(el));
 
          const deletedImages = product.images.filter(el => !newDataModal.images.includes(el));

          if (deletedImages.length > 0) {
            deletedImages.forEach(el => deleteImageFromStorage(el));
          }

          await uploadFileToStoragesFolder(files, product, restedImages);

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
         
          createNewProduct(newDataModal, file, files);
          setFetchCount(fetchCount + 1);
        
          setShowModalWithForm(false);
        } catch (error) {
          alert(error);
        }
      }
    );

  const handleChangeMainPhoto = (e) => {
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

  const handleChangePhotos = (e) => {
    if (e.target.files[0]) {
      setFiles([...files, e.target.files[0]] );
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewDataModal({...newDataModal, images: [...newDataModal.images, reader.result] });
      };
    
      reader.readAsDataURL(e.target.files[0]);
      inputRef.current.focus();
    }
  };

  const handleDeletePhoto = (ind) => {
    const newImages = newDataModal.images.filter((e, i) => i !== ind);
    setNewDataModal({...newDataModal, images: newImages });
    const newFiles = files.filter((e, i) => i !==ind);
    setFiles(newFiles);
  };

  const handleTabsChange = (e) => {
    setTabsState({
      ru: false,
      en: false,
      az: false,
      [e.currentTarget.name]: true,
    });
    
  };
  
  console.log(newDataModal);

  return (
    
    <form onSubmit={(e) => handleSubmitModal(e)}>
      <div className="productForm__imgs">
        <div className="productForm__imgs-item">
          <img 
            src={newDataModal.image || addMainPhoto} 
            alt="product__image"
            className="productForm__imgs-image"
          />
          <div  
            className="productForm__file" 
          >
            <img src={photo} alt="" /> 
          
          </div>

          <input
            type="file"
            onChange={(e) => handleChangeMainPhoto(e)}
          />
        </div>

        <div className="productForm__imgs-items">
          <div className="productForm__imgs-item">
            <img 
              src={newDataModal.images?.length > 0 ? newDataModal.images.reverse()[0] : addPhotos} 
              alt="product__image"
              className="productForm__imgs-image"
            />
            <div  
              className="productForm__file" 
            >
              <img src={photo} alt="" />
            </div>

            <input
              type="file"
              onChange={(e) => handleChangePhotos(e)}
            />
          </div>

          {newDataModal.images?.length > 1 && 
            newDataModal.images.reverse().slice(1).map((el, i) => {
              return (
                <div className="productForm__imgs-item" key={`${el}${i}`}>
                  <img
                    src={newDataModal.images[i]} 
                    alt="product__image"
                    className="productForm__imgs-image"
                  />
                  <button  
                    type="button"
                    className="productForm__file" 
                    onClick={() => handleDeletePhoto(i)}
                  >
                    -
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    
      <div className="productForm__langTabs">
        <div className="productForm__langTabs-tabsButtons">
          <button 
            type="button"
            name="ru"
            className={classNames(
              'productForm__langTabs-tabsButtons-item',
              {'productForm__langTabs-tabsButtons-item--active' : tabsState.ru}
            )}
            onClick={(e) => handleTabsChange(e)}
          >
            Ru
          </button>
          <button
            type="button"
            name="en"
            className={classNames(
              'productForm__langTabs-tabsButtons-item',
              {'productForm__langTabs-tabsButtons-item--active' : tabsState.en}
            )}
            onClick={(e) => handleTabsChange(e)}
          >
            En
          </button>
          <button
            type="button"
            name="az"
            className={classNames(
              'productForm__langTabs-tabsButtons-item',
              {'productForm__langTabs-tabsButtons-item--active' : tabsState.az}
            )}
            onClick={(e) => handleTabsChange(e)}
          >
            Az
          </button>
        </div>

        {tabsState.ru && (
          <div className={classNames(
            'productForm__langTabs-body', 
            {
              'productForm__langTabs-body--right': tabsState.ru,
              'productForm__langTabs-body--left': tabsState.az,
              'productForm__langTabs-body--center': tabsState.en,
            }
          )}
          >
            <input
              type="text"
              value={newDataModal.ru.title}
              placeholder="название"
              className="productForm__input"
              onChange={(e) => handleChangeModalWithLang('title', e.target.value, 'ru')} 
              autoFocus
              ref={inputRef}
            />
            <textarea
              type="text"
              value={newDataModal.ru.description}
              placeholder="описание"
              className="productForm__input"
              onChange={(e) => handleChangeModalWithLang('description', e.target.value, 'ru')} 
          
          
            />
            <textarea
              type="text"
              value={newDataModal.ru.taste}
              placeholder="вкус"
              className="productForm__input"
              onChange={(e) => handleChangeModalWithLang('taste', e.target.value, 'ru')} 
            />
          </div>
        )}

        {tabsState.en && (
          <div className={classNames(
            'productForm__langTabs-body', 
            {
              'productForm__langTabs-body--right': tabsState.ru,
              'productForm__langTabs-body--left': tabsState.az,
              'productForm__langTabs-body--center': tabsState.en,
            }
          )}
          >
            <input
              type="text"
              value={newDataModal.en.title}
              placeholder="title"
              className="productForm__input"
              onChange={(e) => handleChangeModalWithLang('title', e.target.value, 'en')} 
              autoFocus
              ref={inputRef}
            />
            <textarea
              type="text"
              value={newDataModal.en.description}
              placeholder="description"
              className="productForm__input"
              onChange={(e) => handleChangeModalWithLang('description', e.target.value, 'en')} 
            />
            <textarea
              type="text"
              value={newDataModal.en.taste}
              placeholder="taste"
              className="productForm__input"
              onChange={(e) => handleChangeModalWithLang('taste', e.target.value, 'en')} 
            />
          </div>
        )}

        {tabsState.az && (
          <div className={classNames(
            'productForm__langTabs-body', 
            {
              'productForm__langTabs-body--right': tabsState.ru,
              'productForm__langTabs-body--left': tabsState.az,
              'productForm__langTabs-body--center': tabsState.en,
            }
          )}
          >
            <input
              type="text"
              value={newDataModal.az.title}
              placeholder="ad"
              className="productForm__input"
              onChange={(e) => handleChangeModalWithLang('title', e.target.value, 'az')} 
              autoFocus
              ref={inputRef}
            />
            <textarea
              type="text"
              value={newDataModal.az.description}
              placeholder="təsviri"
              className="productForm__input"
              onChange={(e) => handleChangeModalWithLang('description', e.target.value, 'az')} 
          
          
            />
            <textarea
              type="text"
              value={newDataModal.az.taste}
              placeholder="dadmaq"
              className="productForm__input"
              onChange={(e) => handleChangeModalWithLang('taste', e.target.value, 'az')} 
            />
          </div>
        )}
      </div>
      
      <input
        type="text"
        value={newDataModal.price}
        placeholder="цена"
        className="productForm__input"
        onChange={(e) => handleChangeModal('price', e.target.value)} 
      />
      <input
        type="text"
        value={newDataModal.weight}
        placeholder="вес (в граммах)"
        className="productForm__input"
        onChange={(e) => handleChangeModal('weight', e.target.value)} 
      />
      <input
        type="text"
        value={newDataModal.count}
        placeholder="количество"
        className="productForm__input"
        onChange={(e) => handleChangeModal('count', e.target.value)} 
      />
      <input
        type="text"
        value={newDataModal.path}
        placeholder="путь в формате (tort-s-klubnikoj)"
        className="productForm__input"
        onChange={(e) => handleChangeModal('path', e.target.value)} 
      />
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
      <button type="submit" className="productForm__submitButton">Добавить</button>
    </form>
  );
};