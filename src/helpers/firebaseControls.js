import {format} from 'date-fns';
import { ref, deleteObject } from 'firebase/storage';
import  { db }  from '../firebase';
import { storage } from '../firebase';

export async function  getCollection (collection)    {
  return new  Promise(function (resolve, reject) {
    db.collection(collection).get().then(res => {
      const data = [];
      res.forEach(doc => {
        data.push({
          idPost: doc.id,
          ...doc.data(),
        });
      });
      resolve(data);
    }).catch(err => {
      reject(err);
    });
  });
};

export function updateDocumentInCollection(collection, document, idDocumnent) {
  return new Promise(function (resolve, reject) {
    try {
      db.collection(collection).doc(idDocumnent).update(document).then(r => {
        resolve({result: r});
      }).catch(e => {
        reject(e);
      });
    } catch (e) {
      reject(e);
    }
  });
};

export function setDocumentToCollection(collection, document) {
  return new Promise(function (resolve, reject) {
    try {
      db.collection(collection).add(document)
        .then(r => {
          updateDocumentInCollection(collection, {...document, idPost: r.id}, r.id)
            .then(res => console.log('success')).catch(e => console.log(e));
          resolve({result: r});
        }).catch(e => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};

export function getCollectionWhereKeyValue(collection, key, value) {
  return new Promise(function (resolve, reject) {
    db.collection(collection).where(key, '==', value).get().then(res => {
      const data = [];
      res.forEach(doc => {
        data.push({
          ...doc.data(),
          idPost: doc.id,
        });
      });
      resolve(data);
    }).catch(err => {
      reject(err);
    });
  });
};

export async function updateFieldInDocumentInCollection (collection, docId, fieldName, newValue) {

  let result;

  try {
    const docRef = db.collection(collection).doc(docId);
    result = await docRef.update({[fieldName]: newValue});
  } catch (error) {
    console.log(error.message);
  }

  return result;
};

export function removeDocumentFromCollection(collection, docId) {
  return new Promise(function (resolve, reject) {
    try {
     
      db.collection(collection).doc(docId).delete()
        .then(r => {
          resolve(r);
        }).catch(e => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};


export function uploadFileToStorage (file, product) {
  return new Promise(function (resolve, reject) {
    storage.ref(`${product.id}`).put(file).then(res => {
     
      storage.ref().child(product.id).getDownloadURL().then(r => {
        updateFieldInDocumentInCollection('products', product.idPost, 'image', r);
        console.log('updateUrl');
      }).catch(er => {
        alert(er);
      });
      resolve(res);
    }).catch(e => {
      reject(e);
    });
  });
};

export async function uploadFileToStoragesFolder (files, product, newInformation) {
  const imagesUrl = [];
  const promisesUploadImages = [];
  for (let i = 0; i < files.length; i++) {
    const uploadTask = new Promise(function (resolve, reject) {
      storage.ref(`images${product.id}/${files[i].name}`).put(files[i]).then(res => {
        storage.ref(`images${product.id}`).child(files[i].name).getDownloadURL().then(url => {
          imagesUrl.push(url);
          resolve(res);
        }).catch(e => {
          console.log(e);
        });
      }).catch(e => {
        reject(e);
      });
    });
    promisesUploadImages.push(uploadTask);
  }
  
  return   Promise.all(promisesUploadImages).then(res => {
    return new Promise(function (resolve, reject) {
  
      updateFieldInDocumentInCollection(
        'products', product.idPost, 'images', [...newInformation, ...imagesUrl]).then(r => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  });
};


export function deleteObjectFromeStorage (product) {
  const deleteMainImage = new Promise(function (resolve, reject) {
    deleteObject(ref(storage, `${product.image}`)).then((r) => {
      resolve(r);
    }).catch((error) => {
      reject(error);
    });
  });

  const imagesRef = storage.ref().child(`images${product.id}`);

  const deleteImages = new Promise (function (resolve, reject) {
    imagesRef.listAll().then(function (result) {
      console.log(result._delegate.items);
      result._delegate.items.forEach(function (file) {
        deleteObject(ref(storage, file));
      });
      resolve(result);
    }).catch(error => {
      reject(error);
    });
  });
 

  return Promise.all([deleteMainImage, deleteImages]);
};

export function deleteImageFromStorage (image) {
  return new Promise(function (resolve, reject) {
    deleteObject(ref(storage, image)).then((r) => {
      resolve(r);
    }).catch((error) => {
      reject(error);
    });
  });
};


export function createNewUser(regInfo) {

  return new Promise(function (resolve, reject) {
  
    const user_to_firebase_start = {
      uid: regInfo?.uid,
      email: regInfo?.email || '',
      name: regInfo?.name || '',
      phoneNumber: regInfo?.phoneNumber || '',
      address: regInfo?.address || '',
      dateCreating: format(new Date(), 'dd-MM-yyyy HH:mm'),
      role: 'user',
    };
    setDocumentToCollection('users', user_to_firebase_start).then(r => {
      console.log('user saved in DB');
      resolve(r);
    }).catch(e => {
      reject(e);
    });
  });
};

export function createNewOrder(orderInfo, user) {

  return new Promise(function (resolve, reject) {
  
    const order_to_firebase = {
      uidUser: user.uid,
      orderNumber : Math.floor(Date.now() * Math.random()).toString(),
      dateCreating: format(new Date(), 'yyyy-MM-dd HH:mm'),
      status: 'Новый',
      sum: orderInfo.sum,
      orderDetails: orderInfo.details,
    };

    setDocumentToCollection('orders', order_to_firebase).then(r => {
      console.log('order saved in DB');
      resolve(r);
    }).catch(e => {
      reject(e);
    });
  });
};

export function createNewProduct(productInfo, file ,files) {
  
  const id = Math.floor(Date.now() * Math.random()).toString();
  let urlMainImages = '';
  const imagesUrl = [];
  const uploadMainImage = file ? new Promise(function (resolve, reject) {
   
    storage.ref(`${id}`).put(file).then(res => {
      storage.ref().child(id).getDownloadURL().then(url => {
        urlMainImages = url;
        resolve(res);
      }).catch(e => {
        console.log(e);
      });
    }).catch(e => {
      reject(e);
    });
  }) : null;

  const promisesUploadImages = [];

  for (let i = 0; i < files.length; i++) {
    const uploadTask = new Promise(function (resolve, reject) {
      storage.ref(`images${id}/${files[i].name}`).put(files[i]).then(res => {
        storage.ref(`images${id}`).child(files[i].name).getDownloadURL().then(url => {
          imagesUrl.push(url);
          resolve(res);
        }).catch(e => {
          console.log(e);
        });
      }).catch(e => {
        reject(e);
      });
    });
    promisesUploadImages.push(uploadTask);
  }

  Promise.all([uploadMainImage, ...promisesUploadImages]).then(res => {
    return new Promise(function (resolve, reject) {
  
      const product_to_firebase = {
        id,
        image: urlMainImages,
        images: imagesUrl,
        ru: {
          title: productInfo.ru.title || '', 
          description: productInfo.ru.description || '',
          taste: productInfo.ru.taste || '',
        },
        en: {
          title: productInfo.en.title || '', 
          description: productInfo.en.description || '',
          taste: productInfo.en.taste || '',
        },
        az: {
          title: productInfo.az.title || '', 
          description: productInfo.az.description || '',
          taste: productInfo.az.taste || '',
        },
        price: productInfo.price || '', 
        weight: productInfo.weight || '',
        count: productInfo.count || '',
        path: productInfo.path.length > 0 ? `${id}-${productInfo.path}` : id,
        type: productInfo.type,
        dateCreating: format(new Date(), 'yyyy-MM-dd HH:mm'),
      };

      setDocumentToCollection('products', product_to_firebase).then(r => {
        console.log('product saved in DB');
        resolve(r);
      }).catch(e => {
        reject(e);
      });
    });
  });
};
