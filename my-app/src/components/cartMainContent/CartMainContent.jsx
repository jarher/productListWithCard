import React from "react";
import { Button } from "../button/Button";
import "./cartMainContent.css";
import { UseProduct } from "../../context/AppContext";

export const CartMainContent = ({ buttonProps, children }) => {
  const { cartProducts } = UseProduct();
  const { buttonText } = buttonProps;
  return (
    <>
      {children}
      {cartProducts.length > 0 && (
        <Button className="cart-main-content__button" {...buttonProps}>
          {buttonText}
        </Button>
      )}
    </>
  );
};
