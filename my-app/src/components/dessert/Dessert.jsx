import { UseProduct } from "../../context/AppContext.jsx";
import { Card } from "../card/Card.jsx";
import "./dessert.css";

export const Dessert = () => {
  const { cardData } = UseProduct();
  return (
    <div className="dessert__container">
      <h1>Desserts</h1>
      <div className="dessert__card-wrapper">
        {cardData.map((productData) => (
          <Card {...productData} key={productData.name} />
        ))}
      </div>
    </div>
  );
};
