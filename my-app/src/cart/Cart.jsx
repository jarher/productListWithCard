import { useState, useEffect } from "react";
import { UseProduct } from "../context/AppContext";
import { ReactComponent as IllustrationEmptyCart } from "../icons/illustration-empty-cart.svg";
import { ReactComponent as IconCarbonNeutral } from "../icons/icon-carbon-neutral.svg";
import { OrderList } from "../orderList/OrderList.jsx";
import { OrderListWrapper } from "../orderListWrapper/OrderListWrapper.jsx";
import { OrderContainer } from "../orderContainer/OrderContainer.jsx";
import "./cart.css";

export const Cart = () => {
  const { cartProducts, setIsOpenOrderConfirm } = UseProduct();
  const [quantityNumber, setQuantityNumber] = useState(0);

  const getNumberOfOrders = (arr) =>
    arr
      .map((product) => product.quantity)
      .reduce((acc, current) => acc + current, 0);

  useEffect(() => {
    setQuantityNumber(getNumberOfOrders(cartProducts));
  }, [cartProducts]);

  const orderConfirmProps = {
    buttonText: "Confirm Order",
    buttonHandler: () => setIsOpenOrderConfirm(true),
    ariaLabelText: "confirm shopping cart order",
  };

  return (
    <div className="cart-products">
      <h2> Your Cart ({quantityNumber})</h2>
      <div className="cart-products-content">
        {quantityNumber ? (
          <OrderContainer {...orderConfirmProps}>
            <OrderListWrapper>
              <OrderList hasThumbnail={false} hasDeleteButton={true} />
            </OrderListWrapper>
            <MainText />
          </OrderContainer>
        ) : (
          <div className="cart-message-wrapper">
            <IllustrationEmptyCart />
            <span className="cart-message">Your added items appear here</span>
          </div>
        )}
      </div>
    </div>
  );
};

const MainText = () => {
  return (
    <div className="carbon-neutral__wrapper">
      <IconCarbonNeutral />
      <span>
        This is a <b>carbon-neutral</b> delivery
      </span>
    </div>
  );
};
