import { Button } from "../button/Button.jsx";
import { ReactComponent as IconRemove } from "../../icons/icon-remove-item.svg";
import { UseProduct } from "../../context/AppContext.jsx";
import { useEffect, useState } from "react";
import helpers from "../../helpers/helpers.js";
import "./cartItem.css";

export const CartItem = ({
  thumbnail,
  name,
  price,
  quantity,
  hasCloseButton,
  hasThumbnail,
  hasTotal,
}) => {
  const { setProductCartDeleted, cartProducts, setCartProducts } = UseProduct();
  const productTotalProps = {
    price,
    quantity,
  };
  const deleteFromCart = () => {
    const matchProduct = helpers.matchProductOrdered(cartProducts, name);
    setCartProducts(helpers.deleteProductFromCart(cartProducts, name));
    if (matchProduct) {
      setProductCartDeleted(matchProduct.name);
    }
  };

  return (
    <div className="cart-item__container">
      {hasThumbnail && (
        <figure className="cart-item__thumbnail-wrapper">
          <img src={thumbnail} alt={`thumbnail of ${name}`} />
        </figure>
      )}

      <div className="col">
        <span className="cart-item__product-name">{name}</span>
        <div className="cart-item__additional-data">
          <span className="cart-item__quantity">{quantity}x</span>
          <span className="cart-item__price">
            @${helpers.formatNumber(price)}
          </span>
          {hasTotal && <ProductTotal {...productTotalProps} />}
        </div>
      </div>

      <div className="col">
        {!hasTotal && <ProductTotal {...productTotalProps} />}
        {hasCloseButton && (
          <Button
            className="cart-item__close-button"
            buttonHandler={deleteFromCart}
          >
            <IconRemove />
            <span>Remove icon</span>
          </Button>
        )}
      </div>
    </div>
  );
};

const ProductTotal = ({ price, quantity }) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(helpers.formatNumber(helpers.multiplication(price, quantity)));
  }, [quantity]);
  return <span className="cart-item__total">${total}</span>;
};
