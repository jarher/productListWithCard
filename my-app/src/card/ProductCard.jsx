import { useEffect, useState } from "react";
import { ReactComponent as IconIncrementQuantity } from "../icons/icon-increment-quantity.svg";
import { ReactComponent as IconDecrementQuantity } from "../icons/icon-decrement-quantity.svg";
import { ReactComponent as IconAddToCart } from "../icons/icon-add-to-cart.svg";
import { UseProduct } from "../context/AppContext.jsx";
import { Button } from "../button/button.jsx";
import helpers from "../helpers/helpers.js";
import { useCounter } from "../hooks/useCounter.jsx";
import "./productCard.css";

export const ProductCard = ({ image, name, category, price }) => {
  const [imgUrl, setImgUrl] = useState("");
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [isCardSelected, setIsCardSelected] = useState(null);
  const {
    productQuantity,
    setProductQuantity,
    incrementQuantity,
    decrementQuantity,
  } = useCounter();
  //context variables
  const { cartProducts, orderedProducts, nameProductDeleted } = UseProduct();

  const windowSizeHandler = () => setWindowSize(window.innerWidth);

  const selectSizeImage = (size) => {
    if (size <= 425) {
      setImgUrl(image.mobile);
    }
    if (size > 426 && size < 1024) {
      setImgUrl(image.tablet);
    }
    if (size >= 1024) {
      setImgUrl(image.desktop);
    }
  };

  const addToCart = (name, price) => {
    const matchProduct = helpers.matchProductOrdered(cartProducts, name);

    if (matchProduct) {
      // delete product from shopping cart if product quantity is zero
      if (productQuantity === 0) {
        orderedProducts(
          helpers.deleteProductFromCart([...cartProducts], matchProduct.name)
        );
        setIsCardSelected(false);
        return;
      }
      //update quantity value of product cart
      orderedProducts(
        [...cartProducts].map((product) => {
          if (product.name === matchProduct.name) {
            product.quantity = productQuantity;
          }
          return product;
        })
      );
    } else {
      // create new product to cart
      orderedProducts([
        ...cartProducts,
        {
          thumbnail: image.thumbnail,
          name,
          price,
          quantity: productQuantity,
        },
      ]);
    }
  };

  const addButtonHandler = () => {
    incrementQuantity();
    setIsCardSelected(true);
  };

  useEffect(() => {
    const matchProduct = helpers.matchProductOrdered(cartProducts, name);
    if (matchProduct) {
      const quantityValue = matchProduct.quantity;
      const isSelected = quantityValue > 0 ? true : false;
      setProductQuantity(quantityValue);
      setIsCardSelected(isSelected);
    }
    window.addEventListener("resize", windowSizeHandler);
    selectSizeImage(windowSize);

    return () => window.removeEventListener("resize", windowSizeHandler);
  }, []);

  useEffect(() => {
    addToCart(name, price);
  }, [productQuantity]);

  useEffect(() => {
    if (name === nameProductDeleted) {
      setIsCardSelected(false);
    }
  }, [cartProducts]);

  return (
    <div className="card-container">
      <div className="card-header">
        <figure
          className={`card-image-container ${isCardSelected && "card-selected"}
          }`}
        >
          <img src={imgUrl} alt={name} />
        </figure>
        <div
          className={`card-buttons-container ${
            isCardSelected && "card-button-selected"
          }`}
        >
          <div
            className={`card-button-wrapper ${
              productQuantity > 0 && "moveElement-up"
            }
            }`}
          >
            <Button
              className="add-button"
              buttonHandler={addButtonHandler}
              ariaLabelText="add product to shopping cart"
            >
              <IconAddToCart />
              <span className="card-addbutton-text">Add to Cart</span>
            </Button>
            <div className="add-quantity-button-container">
              <Button
                className="counter-button"
                buttonHandler={decrementQuantity}
                ariaLabelText="decrement product quantity"
              >
                <IconDecrementQuantity />
                <span>decrement quantity</span>
              </Button>
              <span className="quantity-value">{productQuantity}</span>
              <Button
                className="counter-button"
                buttonHandler={incrementQuantity}
                ariaLabelText="increment product quantity"
              >
                <IconIncrementQuantity />
                <span>increment quantity</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="card-text">
        <span className="card-subtitle">{category}</span>
        <span className="card-title">{name}</span>
        <span className="card-price">${price}</span>
      </div>
    </div>
  );
};
