import { React, useState } from 'react';
import '../ProductCardBlock1/ProductCardBlock1.scss';
import classNames from 'classnames';

export const ProductCardBlock1 = () => {
  const [feedbackTab, setFeedbackTab] = useState(true);
  const [detailsTab, setDetailsTab] = useState(false);
  const [informationTab, setInformationTab] = useState(false);

  const handleFeedbackTab = () => {
    setDetailsTab(false);
    setInformationTab(false);

    setFeedbackTab(true);
  };

  const handleInformationTab = () => {
    setDetailsTab(false);
    setFeedbackTab(false);

    setInformationTab(true);
  };

  const handleDetailsTab = () => {
    setFeedbackTab(false);
    setInformationTab(false);

    setDetailsTab(true);
  };

  return (
    <div className="productCardBlock1">
      <div className="productCardBlock1__tabs">
        <button 
          className={classNames('productCardBlock1__tabs-button',
            {'productCardBlock1__tabs-button--active': feedbackTab})
          }
      
          onClick={handleFeedbackTab}
        >
          Отзывы
        </button>
        <button 
          // eslint-disable-next-line max-len
          className={classNames('productCardBlock1__tabs-button productCardBlock1__tabs-button--mobile',
            {'productCardBlock1__tabs-button--active': detailsTab})
          }
      
          onClick={handleDetailsTab}
        >
          Подробности
        </button>
        <button 
          // eslint-disable-next-line max-len
          className={classNames('productCardBlock1__tabs-button productCardBlock1__tabs-button--desktop',
            {'productCardBlock1__tabs-button--active': informationTab})
          }
      
          onClick={handleInformationTab}
        >
          Дополнительная информация
        </button>
      </div>
      
      {feedbackTab && (
        <p className="productCardBlock1__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
          maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis
          consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor odio,
          in molestie diam bibendum sed.
        </p>
      )}

      {detailsTab && (
        <p className="productCardBlock1__text">
          some details
        </p>
      )}

      {informationTab && (
        <p className="productCardBlock1__text">
          some information
        </p>
      )}
      
    </div>
  );
};
