import React from "react";
import { Button } from "../button/button.jsx";
import "./orderContainer.css";

export const OrderContainer = ({
  buttonText,
  buttonHandler,
  ariaLabelText,
  children,
}) => {
  return (
    <>
      {children}
      <Button
        className="order-container-button"
        buttonHandler={buttonHandler}
        ariaLabelText={ariaLabelText}
      >
        {buttonText}
      </Button>
    </>
  );
};
