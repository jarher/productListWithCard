import { useEffect, useState } from "react";
import { UseProduct } from "../../context/AppContext";
import { ButtonCard } from "./buttonCard/ButtonCard";
import helpers from "../../helpers/helpers";
import "./card.css";

const selectSizeImage = (image, size, callback) => {
  if (size <= 425) {
    callback(image.mobile);
  }
  if (size > 426 && size < 1024) {
    callback(image.tablet);
  }
  if (size >= 1024) {
    callback(image.desktop);
  }
};

export const Card = (productData) => {
  const [selected, setSelected] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const { image, name, category, price } = productData;

  const { cartProducts, productCartDeleted } = UseProduct();

  const buttonCardProps = {
    ...productData,
    setSelected,
  };
  //change a value of selected state if a product exists in cartProducts
  //load a image according to window width
  useEffect(() => {
    const matchProduct = helpers.matchProductOrdered(cartProducts, name);
    if (matchProduct) {
      setSelected("card__selected");
    }
    selectSizeImage(image, window.innerWidth, setImgUrl);
  }, []);

  //change selected state according comparator results
  useEffect(() => {
    if (productCartDeleted === name) {
      setSelected("");
    }
  }, [productCartDeleted]);

  return (
    <div
      className={
        selected ? "card__container ".concat(selected) : "card__container"
      }
    >
      <div className="card__header">
        <figure className="card-image__container">
          <img src={imgUrl} alt={name} />
        </figure>
        <ButtonCard {...buttonCardProps} />
      </div>
      <div className="card__body">
        <div className="card__body-subtitle">{category}</div>
        <div className="card__body-title">{name}</div>
        <div className="card__body-price">${helpers.formatNumber(price)}</div>
      </div>
    </div>
  );
};
