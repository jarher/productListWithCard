import { useEffect, useState } from "react";
import { UseProduct } from "../../context/AppContext.jsx";
import { CardList } from "../cartList/CartList.jsx";
import { ReactComponent as IconCarbonNeutral } from "../../icons/icon-carbon-neutral.svg";
import { CartMainContent } from "../cartMainContent/CartMainContent.jsx";
import helpers from "../../helpers/helpers.js";
import "./shoppingCart.css";

export const ShoppingCart = () => {
  const { cartProducts, setIsOpenOrderConfirm } = UseProduct();

  const buttonProps = {
    buttonHandler: () => {
      setIsOpenOrderConfirm(cartProducts.length > 0 ? true : false);
    },
    ariaLabelText: "Confirm order button",
    buttonText: "Confirm Order",
  };

  const cartItemProps = {
    hasCloseButton: true,
    hasThumbnail: false,
    hasItemsQuantity: true,
    hasTotal: true,
    id: "shoppingCart",
  };

  return (
    <div className="shopping-cart__container">
      <ShoppingCartTitle cartProducts={cartProducts} />
      <CartMainContent buttonProps={buttonProps}>
        <CardList cartItemProps={cartItemProps} />
        {cartProducts.length > 0 && <ShoppingCartMessage />}
      </CartMainContent>
    </div>
  );
};

const ShoppingCartMessage = () => {
  return (
    <div className="cart-list__cart-message">
      <IconCarbonNeutral />
      <span>
        This is a <b>carbon-neutral</b> delivery
      </span>
    </div>
  );
};

const ShoppingCartTitle = ({ cartProducts }) => {
  const [numOfProducts, setNumOfProducts] = useState(0);

  useEffect(() => {
    setNumOfProducts(helpers.calculateProductQuantity(cartProducts));
  }, [cartProducts]);

  return (
    <h2>
      Your Cart <span>({numOfProducts})</span>
    </h2>
  );
};
