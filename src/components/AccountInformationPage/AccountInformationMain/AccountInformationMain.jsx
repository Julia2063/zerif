import React, { useState, useContext, useEffect}  from 'react';
import { 
  getAuth, 
  signOut, 
  EmailAuthProvider, 
  reauthenticateWithCredential,
  updateEmail,
} from 'firebase/auth';

import '../AccountInformationMain/AccountInformationMain.scss';
import classNames from 'classnames';

import pencil from '../../../images/AccountInformation/penIcon.svg';
import { Modal } from '../../Modal/Modal';
import { AppContext } from '../../AppProvider';
import { 
  getCollectionWhereKeyValue, 
  updateDocumentInCollection,
} from '../../../helpers/firebaseControls';
import { ModalWithForm } from '../../ModalWithForm';


export const AccountInformationMain = () => {
  const [informationTab, setImformationTab] = useState(true);
  const [ordersTab, setOrdersTab] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [promptForCredentials, setPromptForCredentials] = useState(null);

  const [isChangeData, setIsChangeData] = useState({
    isNameChange: false,
    isEmailChange: false,
    isPhoneNumberChange: false,
    isAddressChange: false,
  });
  
  const { user, setUser, userInfo, setUserInfo } = useContext(AppContext);

  const [newData, setNewData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
  });
  const [userOrders, setUserOrders] = useState(null);
  console.log(userOrders);

  const [showReAutrnticateNotification, setShowReAutrnticateNotification] = useState(false);
  const auth = getAuth();

  const fetchData = async () => {
    try {
      const currentUserorders = 
        await getCollectionWhereKeyValue('orders', 'uidUser', auth.currentUser.uid);
      setUserOrders(currentUserorders);
      console.log('hgvhjbvj');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);

    }).catch((error) => {
      setIsModal(true);
      setErrorTitle('Something went wrong...');
      setErrorMessage(error.message);
    });
  };

  const setCurrentInformationTab = () => {
    setOrdersTab(false);
    setImformationTab(true);
  };
  
  const setCurrentOrdersTab = () => {
    setImformationTab(false);
    setOrdersTab(true);
  };

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const handleSetChangeDataInput = (e) => {
    setNewData({
      name: newData.name.length > 0 ? newData.name : userInfo.name,
      email: newData.email.length > 0 ? newData.email: userInfo.email,
      phoneNumber: newData.phoneNumber.length > 0 ? newData.phoneNumber : userInfo.phoneNumber,
      address: newData.address.length > 0 ? newData.address : userInfo.address,
    });

    setIsChangeData(
      {...isChangeData, [e.currentTarget.name] : !isChangeData[e.currentTarget.name]}
    );
  };

  const handleInputChange = (e) => {
    setNewData(
      {...newData, [e.target.name] : e.target.value}
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.providerData[0].providerId === 'password' 
    && user.email !== newData.email && !promptForCredentials) {
      setShowReAutrnticateNotification(true);
      return;
    }

    if (user.providerData[0].providerId === 'password'
     && user.email !== newData.email && promptForCredentials) {
          
      try {
        const password = promptForCredentials.password;
        const { currentUser } = auth;
        const { email } = currentUser;
        const credential = EmailAuthProvider.credential(email, password);

        const result = await reauthenticateWithCredential(currentUser, credential);
        
        console.log(result);
        
      } catch (error) {
        console.log(error);
        setIsModal(true);
        setErrorTitle('Error');
        setErrorMessage(error.message);
        return;
      }

      try {
      
        await updateEmail(auth.currentUser, newData.email);
        setPromptForCredentials(null);
      } catch (error) {
        setIsModal(true);
        setErrorTitle('Error');
        setErrorMessage(error.message);
      }
    }

    
    try {
      await updateDocumentInCollection('users', {...userInfo, ...newData}, userInfo.idPost);
      setIsChangeData({
        isNameChange: false,
        isEmailChange: false,
        isPhoneNumberChange: false,
        isAddressChange: false,
      });
      setUserInfo({...userInfo, ...newData});
    } catch (error) {
      setIsModal(true);
      setErrorTitle('Error');
      setErrorMessage(error.message);
    }
  };

  const handleOrderDetail = (el) => {
    console.log(el.orderDetails);
    setIsModal(true);
    setErrorTitle('Детали заказа');
    setErrorMessage(el.orderDetails );
  };

  return (
    <div className="accountInformationMain">
      
      <div className="accountInformationMain__title">
        <h1>Личный кабинет</h1>
        <button 
          className="accountInformationMain__tabs-item accountInformationMain__tabs-item--mobile"
          onClick={handleSignOut}
        >
            Выход
        </button>
      </div>
      
      <div className="accountInformationMain__tabs">
       
        <button 
          className={classNames(
            'accountInformationMain__tabs-item',
            {'accountInformationMain__tabs-item--active': informationTab}
          )}
          onClick={setCurrentInformationTab}
        >
            Информация
        </button>
        <button 
          className={classNames(
            'accountInformationMain__tabs-item',
            {'accountInformationMain__tabs-item--active': ordersTab}
          )}
          onClick={setCurrentOrdersTab}
        >
            Заказы
        </button>
        <button 
          className="accountInformationMain__tabs-item accountInformationMain__tabs-item--desktop"
          onClick={handleSignOut}
        >
            Выход
        </button>
      </div>
      
      {informationTab && (
        <div className="infoDisplay">
          <div className="infoDisplay__block">
            <div className="infoDisplay__block-title">
              ФИО
              <button
                name="isNameChange"
                onClick={(e) => handleSetChangeDataInput(e)}
              >
                <img
                  src={pencil}
                  alt=""
                  className="penIcon"
                />
              </button>
              
            </div>

            {isChangeData.isNameChange 
              ? <form onSubmit={(e) => handleSubmit(e)}>
                <input 
                  name="name"
                  type="text" 
                  className="infoDisplay__block-input"
                  value={newData.name}
                  autoFocus
                  onChange={(e) => handleInputChange(e)}
                />
              </form>
              : 
              <p className="infoDisplay__block-text">
                {newData.name ? newData.name : userInfo?.name}
              </p>}
            
          </div>

          <div className="infoDisplay__block">
            <div className="infoDisplay__block-title">
            Email
              <button
                name="isEmailChange"
                onClick={(e) => handleSetChangeDataInput(e)}
              >
                <img
                  src={pencil}
                  alt=""
                  className="penIcon"
                />
              </button>
             
            </div>

            {isChangeData.isEmailChange
              ? <form onSubmit={(e) => handleSubmit(e)}>
                <input 
                  name="email"
                  type="email" 
                  className="infoDisplay__block-input"
                  value={newData.email}
                  autoFocus
                  onChange={(e) => handleInputChange(e)}
                />
              </form>
              : 
              <p className="infoDisplay__block-text">
                {newData.email ? newData.email : userInfo?.email}
              </p>}
          </div>
          <div className="infoDisplay__block">
            <div className="infoDisplay__block-title">
              Телефон
              <button
                name="isPhoneNumberChange"
                onClick={(e) => handleSetChangeDataInput(e)}
              >
                <img
                  src={pencil}
                  alt=""
                  className="penIcon"
                />
              </button>
              
            </div>
            {isChangeData.isPhoneNumberChange
              ? <form onSubmit={(e) => handleSubmit(e)}>
                <input 
                  name="phoneNumber"
                  type="text" 
                  className="infoDisplay__block-input"
                  value={newData.phoneNumber}
                  autoFocus
                  onChange={(e) => handleInputChange(e)}
                />
              </form>
              : 
              <p className="infoDisplay__block-text">
                {newData.phoneNumber ? newData.phoneNumber : userInfo?.phoneNumber}
              </p>}
          </div>
          <div className="infoDisplay__block">
            <div className="infoDisplay__block-title">
              Адрес доставки
              <button
                name="isAddressChange"
                onClick={(e) => handleSetChangeDataInput(e)}
              >
                <img
                  src={pencil}
                  alt=""
                  className="penIcon"
                />
              </button>
              
            </div>
            {isChangeData.isAddressChange
              ? <form onSubmit={(e) => handleSubmit(e)}>
                <input 
                  name="address"
                  type="text" 
                  className="infoDisplay__block-input"
                  value={newData.address}
                  autoFocus
                  onChange={(e) => handleInputChange(e)}
                />
              </form>
              : 
              <p className="infoDisplay__block-text">
                {newData.address ? newData.address : userInfo?.address}
              </p>}
          </div>
        </div>
      )}

      {ordersTab && (
        <table className="accountInformationMain__orders">
          <thead>
            <tr>
              <th>Номер заказа</th>
              <th>Дата</th>
              <th>Статус</th>
              <th>Сумма заказа</th>
              <th>Действия</th>
            </tr>
          </thead>
          
          <tbody>
            {userOrders.map(el => {
              return (
                <tr key={el.orderNumber}>
                  <td>{el.orderNumber}</td>
                  <td>
                    {el.dateCreating.split(' ').slice(0, 1).join('').split('-').join('.')}
                  </td>
                  <td>{el.status}</td>
                  <td>{`$ ${el.sum}`}</td>
                  <td>
                    <button onClick={() => handleOrderDetail(el)}>
                      Детали заказа
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          
        </table>
      )}
      {isModal && (
        <Modal
          title={errorTitle} 
          message={errorMessage}
          handleModal={handleModal} 
        />
      )}

      {showReAutrnticateNotification && (
        <ModalWithForm 
          setShowReAutrnticateNotification={setShowReAutrnticateNotification}
          setPromptForCredentials={setPromptForCredentials}
        />
      )}  
    </div>
  );
};
