import React, { useState}  from 'react';
import '../AccountInformationMain/AccountInformationMain.scss';
import classNames from 'classnames';


export const AccountInformationMain = () => {
  const [informationTab, setImformationTab] = useState(true);
  const [ordersTab, setOrdersTab] = useState(false);

  const setCurrentInformationTab = () => {
    setOrdersTab(false);
    setImformationTab(true);
  };
  
  const setCurrentOrdersTab = () => {
    setImformationTab(false);
    setOrdersTab(true);
  };

  

  return (
    <div className="accountInformationMain">
      
      <div className="accountInformationMain__title">
        <h1>Личный кабинет</h1>
        <button 
          className="accountInformationMain__tabs-item accountInformationMain__tabs-item--mobile"
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
        >
            Выход
        </button>
      </div>
      
      {informationTab && (
        <div className="infoDisplay">
          <div className="infoDisplay__block">
            <div className="infoDisplay__block-title">
              ФИО
              <img
                src={require('../../../images/AccountInformation/penIcon.png')}
                alt=""
                className="penIcon"
              />
            </div>
            
            <p className="infoDisplay__block-text">
              Сидоренко Ника Андреевна
            </p>
          </div>

          <div className="infoDisplay__block">
            <div className="infoDisplay__block-title">
            Email
              <img
                src={require('../../../images/AccountInformation/penIcon.png')}
                alt=""
                className="penIcon"
              />
            </div>
            <p className="infoDisplay__block-text">
              zefir@gmail.com
            </p>
          </div>
          <div className="infoDisplay__block">
            <div className="infoDisplay__block-title">
              Телефон
              <img
                src={require('../../../images/AccountInformation/penIcon.png')}
                alt=""
                className="penIcon"
              />
            </div>
            <p className="infoDisplay__block-text">
              +380666137641
            </p>
          </div>
          <div className="infoDisplay__block">
            <div className="infoDisplay__block-title">
              Адрес доставки
              <img
                src={require('../../../images/AccountInformation/penIcon.png')}
                alt=""
                className="penIcon"
              />
            </div>
            <p className="infoDisplay__block-text">
              ул. Дорогожицкая 3, г. Киев
            </p>
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
            <tr>
              <td>7643980998990</td>
              <td>10.02.23</td>
              <td>В обработке</td>
              <td>$ 105</td>
              <td>Детали заказа</td>
            </tr>
            <tr>
              <td>943980998990</td>
              <td>02.02.23</td>
              <td>Доставлено</td>
              <td>$ 100</td>
              <td>Детали заказа</td>
            </tr>
            <tr>
              <td>879980998990</td>
              <td>28.01.23</td>
              <td>Доставлено</td>
              <td>$ 65</td>
              <td>Детали заказа</td>
            </tr> 
          </tbody>
          
        </table>
      )}
      
    </div>
  );
};
