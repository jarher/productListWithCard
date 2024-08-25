import { useEffect, useState } from "react";
import { ReactComponent as IconAddToCart } from "../../../icons/icon-add-to-cart.svg";
import { ReactComponent as IconDecrementQuantity } from "../../../icons/icon-decrement-quantity.svg";
import { ReactComponent as IconIncrementQuantity } from "../../../icons/icon-increment-quantity.svg";
import { Button } from "../../button/Button.jsx";
import { UseProduct } from "../../../context/AppContext.jsx";
import helpers from "../../../helpers/helpers.js";
import "./buttonCard.css";

export const ButtonCard = ({ setSelected, image, name, price }) => {
  const [productQuantity, setProductQuantity] = useState(0);
  const { cartProducts, setCartProducts, productCartDeleted } = UseProduct();

  const updateQuantityFromProductCart = (name) =>
    setCartProducts(
      cartProducts.map((product) => {
        if (product.name === name) {
          product.quantity = productQuantity;
        }
        return product;
      })
    );

  const createNewProductCart = () =>
    setCartProducts([
      ...cartProducts,
      {
        thumbnail: image.thumbnail,
        name,
        price,
        quantity: productQuantity,
      },
    ]);

  const incrementButtonHandler = () => setProductQuantity(productQuantity + 1);

  const decrementButtonHandler = () =>
    setProductQuantity(productQuantity === 0 ? 0 : productQuantity - 1);

  const addButtonHandler = () => {
    setProductQuantity((prev) => prev + 1);
    setSelected("card__selected");
  };
  //to match a product in cartProduct, if exists asign its quantity value to productQuantity state
  useEffect(() => {
    const matchProduct = helpers.matchProductOrdered(cartProducts, name);
    if (matchProduct) {
      setProductQuantity(matchProduct.quantity);
    }
  }, []);
  //if productQuantity dependency changes:
  //1)if no quantity value reset selected state and update cartProduct state
  //2)to match a product in cartProduct, if exists update cartProduct, otherwise create new product
  useEffect(() => {
    if (!productQuantity) {
      setCartProducts(helpers.deleteProductFromCart(cartProducts, name));
      setSelected("");
      return;
    }
    const matchProduct = helpers.matchProductOrdered(cartProducts, name);
    matchProduct ? updateQuantityFromProductCart(name) : createNewProductCart();
  }, [productQuantity]);
  //if productCardDeleted dependency changes compare if its value is equal to name, if it is true set productQuantity to zero
  useEffect(() => {
    if (productCartDeleted === name) {
      setProductQuantity(0);
    }
  }, [productCartDeleted]);
  //if cartProducts is empty set all products quantity to zero
  useEffect(() => {
    if (cartProducts.length === 0) {
      setProductQuantity(0);
    }
  }, [cartProducts]);

  const counterButtonsProps = {
    decrementButtonHandler,
    incrementButtonHandler,
    productQuantity,
  };

  return (
    <div className="card__header-buttons-container">
      <div className="card__header-buttons-wrapper">
        <Button className="card__add-button" buttonHandler={addButtonHandler}>
          <IconAddToCart />
          <span>Add to Cart</span>
        </Button>
        <CounterButtons {...counterButtonsProps} />
      </div>
    </div>
  );
};

const CounterButtons = ({
  decrementButtonHandler,
  incrementButtonHandler,
  productQuantity,
}) => {
  return (
    <div className="card__counter-button-wrapper">
      <Button
        className="card__counter-button"
        buttonHandler={decrementButtonHandler}
      >
        <IconDecrementQuantity />
        <span>Decrement quantity</span>
      </Button>
      <span className="card__header-quantity">{productQuantity}</span>
      <Button
        className="card__counter-button"
        buttonHandler={incrementButtonHandler}
      >
        <IconIncrementQuantity />
        <span>Increment quantity</span>
      </Button>
    </div>
  );
};
