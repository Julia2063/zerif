import {format} from 'date-fns';
import  { db }  from '../firebase';


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
