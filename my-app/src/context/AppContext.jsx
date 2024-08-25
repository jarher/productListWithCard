import data from "../data.json";
const { createContext, useContext, useState, useEffect } = require("react");

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [isOpenOrderConfirm, setIsOpenOrderConfirm] = useState(false);
  const [productCartDeleted, setProductCartDeleted] = useState("");
  const [cartProducts, setCartProducts] = useState([
    {
      thumbnail: "./images/image-tiramisu-thumbnail.jpg",
      name: "Classic Tiramisu",
      price: 5.5,
      quantity: 1,
    },
    {
      thumbnail: "./images/image-creme-brulee-thumbnail.jpg",
      name: "Vanilla Bean Crème Brûlée",
      price: 7.0,
      quantity: 4,
    },

    {
      thumbnail: "./images/image-panna-cotta-thumbnail.jpg",
      name: "Vanilla Panna Cotta",
      price: 6.5,
      quantity: 2,
    },
  ]);
  const [cardData] = useState([...data]);

  useEffect(() => {
    if (isOpenOrderConfirm) {
      window.scroll(0, 0);
    }
  }, [isOpenOrderConfirm]);

  return (
    <ProductContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        setIsOpenOrderConfirm,
        isOpenOrderConfirm,
        productCartDeleted,
        setProductCartDeleted,
        cardData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const UseProduct = () => useContext(ProductContext);
