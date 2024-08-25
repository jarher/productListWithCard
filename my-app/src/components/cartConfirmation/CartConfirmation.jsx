import { UseProduct } from "../../context/AppContext.jsx";
import { CardList } from "../cartList/CartList.jsx";
import { ReactComponent as IconOrderConfirmed } from "../../icons/icon-order-confirmed.svg";
import { CartMainContent } from "../cartMainContent/CartMainContent.jsx";
import { useEffect, useRef } from "react";
import "./cartCofirmation.css";

export const CartConfirmation = () => {
  const cartConfirmRef = useRef(null);
  const { setIsOpenOrderConfirm, isOpenOrderConfirm, setCartProducts } =
    UseProduct();

  const buttonProps = {
    buttonHandler: () => {
      setIsOpenOrderConfirm(false);
      setCartProducts([]);
    },
    buttonText: "Start New Order",
    ariaLabelText: "Start new order button",
  };

  const cartItemProps = {
    hasCloseButton: false,
    hasThumbnail: true,
    hasItemsQuantity: false,
    hasTotal: false,
    id: "cartConfirmation",
  };

  let timeOutId;

  const timeOut = (callback) => {
    timeOutId = setTimeout(callback, 300);
  };

  const fadeInCartConfirmation = () => {
    cartConfirmRef.current.classList.add("show-confirmation");
    return timeOut(() => cartConfirmRef.current.classList.add("fade-in"));
  };

  const fadeOutCartConfirmation = () => {
    cartConfirmRef.current.classList.remove("fade-in");
    return timeOut(() =>
      cartConfirmRef.current.classList.remove("show-confirmation")
    );
  };

  useEffect(() => {
    if (isOpenOrderConfirm) {
      fadeInCartConfirmation();
      return;
    }
    fadeOutCartConfirmation();
    return () => {
      clearTimeout(timeOutId);
    };
  }, [isOpenOrderConfirm]);

  return (
    <div className="cart-confirmation__container" ref={cartConfirmRef}>
      <div className="cart-confirmation__wrapper">
        <IconOrderConfirmed />
        <h2>Order Confirmed</h2>
        <span className="cart-list__subtitle">
          we hope you enjoy your food!
        </span>
        <CartMainContent buttonProps={buttonProps}>
          <CardList cartItemProps={cartItemProps} />
        </CartMainContent>
      </div>
    </div>
  );
};
