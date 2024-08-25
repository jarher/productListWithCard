import { ReactComponent as IconEmptyCart } from "../../icons/illustration-empty-cart.svg";
import { UseProduct } from "../../context/AppContext.jsx";
import { CartItem } from "../cartItem/CartItem.jsx";
import helpers from "../../helpers/helpers.js";
import { useState, useEffect } from "react";
import "./cartList.css";

export const CardList = (props) => {
  const { cartProducts } = UseProduct();

  const { cartItemProps } = props;

  return (
    <div className="cart-list__container">
      {cartProducts.length ? (
        <CartListWrapper cartProducts={cartProducts}>
          {cartProducts.map((product) => (
            <CartItem
              {...cartItemProps}
              {...product}
              key={`${cartItemProps.id}-${product.name}`}
            />
          ))}
        </CartListWrapper>
      ) : (
        <div className="cart-list__empty-cart">
          <IconEmptyCart />
          <span>You added items appear here</span>
        </div>
      )}
    </div>
  );
};

const CartListWrapper = ({ cartProducts, children }) => {
  return (
    <div className="card-list__wrapper">
      <div className="cart-list__items-wrapper">{children}</div>
      <div className="cart-list__total-wrapper">
        <span>Order Total</span>
        <TotalValue cartProducts={cartProducts} />
      </div>
    </div>
  );
};

const TotalValue = ({ cartProducts }) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(helpers.formatNumber(helpers.calculateOrderTotal(cartProducts)));
  }, [cartProducts]);
  return <span className="cart-list__total-value">${total}</span>;
};
