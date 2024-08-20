import data from "../data.json";
const { createContext, useContext, useState } = require("react");

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [isOpenOrderConfirm, setIsOpenOrderConfirm] = useState(false);
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
  const [nameProductDeleted, setNameProductDeleted] = useState("");

  const orderedProducts = (product) => setCartProducts(product);
  const productDeleted = (name) => setNameProductDeleted(name);

  return (
    <ProductContext.Provider
      value={{
        cartProducts,
        orderedProducts,
        setIsOpenOrderConfirm,
        isOpenOrderConfirm,
        nameProductDeleted,
        productDeleted,
        data,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const UseProduct = () => useContext(ProductContext);
