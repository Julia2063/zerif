import { React } from 'react';
import '../Main/Main.scss';
import '../../../styles/max1440.scss';

export const Main = () => {
  return (
    <div className="main">
      <div className="main__block">
        <h3 className="h3">Lorem ipsum <br />Dolor sit amet</h3>
        <p className="p">
            Lorem ipsum dolor sit amet, Consectetur adipiscing elit Sed do
            eiusmod tempor
        </p>
        <button className="order-button">Оформить заказ</button>
      </div>
    </div>
  );
};
