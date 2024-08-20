import { ProductCard } from "../card/ProductCard.jsx";
import { UseProduct } from "../context/AppContext";
import "./desserts.css";

export const Desserts = () => {
  const { data } = UseProduct();

  return (
    <div className="desserts-products">
      <h1>Deserts</h1>
      <div className="desserts-wraper">
        {data.map((product) => (
          <ProductCard {...product} key={product.name} />
        ))}
      </div>
    </div>
  );
};
