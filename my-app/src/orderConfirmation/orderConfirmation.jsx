import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as IconOrderConfirmed } from "../icons/icon-order-confirmed.svg";
import { OrderContainer } from "../orderContainer/OrderContainer.jsx";
import { OrderListWrapper } from "../orderListWrapper/OrderListWrapper.jsx";
import { UseProduct } from "../context/AppContext.jsx";
import { OrderList } from "../orderList/OrderList.jsx";
import "./orderConfirmation.css";

export const OrderConfirmation = () => {
  const { orderedProducts, isOpenOrderConfirm, setIsOpenOrderConfirm } =
    UseProduct();

  const modalRef = useRef(null);

  const closeModalWindow = () => {
    if (modalRef.current.dataset.name) {
      setIsOpenOrderConfirm(false);
    }
  };

  const startNewOrderButtonProps = {
    buttonText: "Start New Order",
    buttonHandler: () => {
      orderedProducts([]);
    },
    ariaLabelText: "Start new order",
  };

  useEffect(() => {
    if (isOpenOrderConfirm) {
      setTimeout(() => modalRef.current.classList.add("fadeIn"), 300);
    }
  }, [isOpenOrderConfirm]);

  return (
    <div
      className="modal-container"
      onClick={closeModalWindow}
      ref={modalRef}
      data-name="modalWindow"
    >
      <div className="order-confirmation">
        <OrderContainer {...startNewOrderButtonProps}>
          <MainText />
          <OrderListWrapper>
            <OrderList hasThumbnail={true} hasDeleteButton={false} />
          </OrderListWrapper>
        </OrderContainer>
      </div>
    </div>
  );
};

const MainText = () => {
  return (
    <>
      <div className="icon-confirmed-wrapper">
        <IconOrderConfirmed />
      </div>
      <span className="order-confirmation__title">Order Confirmed</span>
      <span>We hope you enjoy your food!</span>
    </>
  );
};
