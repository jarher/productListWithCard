import { UseProduct } from "../context/AppContext";
import helpers from "../helpers/helpers";
import "./orderListWrapper.css";

export const OrderListWrapper = ({ children }) => {
  const { cartProducts } = UseProduct();
  return (
    <>
      <div className="orders-list-wrapper">
        {children}
        <div className="order-total-wrapper">
          <span>Order Total</span>
          <span className="order-total__value">
            ${helpers.calculateOrderTotal([...cartProducts])}
          </span>
        </div>
      </div>
    </>
  );
};
