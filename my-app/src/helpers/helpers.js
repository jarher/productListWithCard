const deleteProductFromCart = (products, name) => {
  return products.filter((product) => product.name !== name);
};
const calculateOrderTotal = (products) => {
  return products
    .map((product) => product.price * product.quantity)
    .reduce((acc, current) => acc + current, 0);
};
const matchProductOrdered = (products, name) =>
  products.find((product) => product.name === name);

const calculateProductQuantity = (products) => {
  return products
    .map((product) => {
      return product.quantity;
    })
    .reduce((acc, current) => acc + current, 0);
};

const multiplication = (num1, num2) => num1 * num2;

const formatNumber = (number) => Number.parseFloat(number).toFixed(2);

const helpers = {
  deleteProductFromCart,
  calculateOrderTotal,
  calculateProductQuantity,
  matchProductOrdered,
  formatNumber,
  multiplication,
};

export default helpers;
