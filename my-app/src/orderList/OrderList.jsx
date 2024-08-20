import { useEffect, useState } from "react";
import { UseProduct } from "../context/AppContext.jsx";
import { ReactComponent as IconDeleteItem } from "../icons/icon-remove-item.svg";
import { Button } from "../button/button.jsx";
import helpers from "../helpers/helpers.js";
import "./orderList.css";

export const OrderList = ({ hasThumbnail, hasDeleteButton }) => {
  const [productOrder, setProductOrder] = useState([]);
  const { cartProducts, orderedProducts } = UseProduct();

  const addProductTotal = () => {
    const newProductOrder = [...cartProducts];
    return newProductOrder.map((product) => {
      return {
        ...product,
        total: product.price * product.quantity,
      };
    });
  };

  useEffect(() => {
    setProductOrder(addProductTotal());
  }, [cartProducts]);

  return (
    <div className="orders">
      {productOrder.map((product) => {
        const productProps = {
          ...product,
          hasThumbnail,
          hasDeleteButton,
          cartProducts,
          orderedProducts,
        };
        return <ProductCartItem {...productProps} key={product.name} />;
      })}
    </div>
  );
};

const ProductCartItem = ({
  thumbnail,
  name,
  quantity,
  price,
  total,
  hasThumbnail,
  hasDeleteButton,
  cartProducts,
  orderedProducts,
}) => {
  const { productDeleted } = UseProduct();
  const deleteProduct = () => {
    orderedProducts(helpers.deleteProductFromCart([...cartProducts], name));
    productDeleted(name);
  };

  return (
    <div className="product-cart-item">
      <div className="product-cart__data">
        {hasThumbnail && (
          <img className="product-thumbnail" src={thumbnail} alt={name} />
        )}
        <span className="product-cart__name">{name}</span>
        <div className="product-prices__wrapper">
          <span className="product-cart__quantity">{quantity}x</span>@
          <span className="product-cart__price">${price}</span>
          <span className="product-cart__total">${total}</span>
          {hasDeleteButton && (
            <Button
              className="product-cart__delete-button"
              buttonHandler={deleteProduct}
              ariaLabelText="delete product from shopping cart"
            >
              <IconDeleteItem />
              <span>delele button</span>
            </Button>
          )}
        </div>
        <div className="clear"></div>
      </div>
    </div>
  );
};
