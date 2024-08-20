const deleteProductFromCart = (products, valueToCompare) => {
  return products.filter((product) => product.name !== valueToCompare);
};
const calculateOrderTotal = (products) => {
  return products
    .map((product) => product.price * product.quantity)
    .reduce((acc, current) => acc + current, 0);
};
const matchProductOrdered = (products, name) =>
  products.find((product) => product.name === name);

const helpers = {
  deleteProductFromCart,
  calculateOrderTotal,
  matchProductOrdered,
};

export default helpers;
