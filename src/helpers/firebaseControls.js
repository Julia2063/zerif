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
    storage.ref(`${file.name}`).put(file).then(res => {
     
      storage.ref().child(file.name).getDownloadURL().then(r => {
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

export function deleteObjectFromeStorage (product) {
  return new Promise(function (resolve, reject) {
    deleteObject(ref(storage, `${product.image}`)).then((r) => {
      resolve(r);
    }).catch((error) => {
      reject(error);
      
    });
  });
}


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
      dateCreating: format(new Date(), 'dd-MM-yyyy HH:mm'),
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

export function createNewProduct(productInfo, file) {

  return new Promise(function (resolve, reject) {
    storage.ref(`${file.name}`).put(file).then(res => {
     
      storage.ref().child(file.name).getDownloadURL().then(r => {
        const product_to_firebase = {
          id : Math.floor(Date.now() * Math.random()).toString(),
          image: r,
          title: productInfo.title,
          price: productInfo.price,
          type: productInfo.type,
        };
        setDocumentToCollection('products', product_to_firebase).then(r => {

          console.log('product saved in DB');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
      
    });
    
  });
};
