import { useState } from "react";

export function useCounter() {
  const [productQuantity, setProductQuantity] = useState(0);

  const incrementQuantity = () => setProductQuantity(productQuantity + 1);
  const decrementQuantity = () =>
    setProductQuantity(productQuantity <= 0 ? 0 : productQuantity - 1);

  return {
    productQuantity,
    setProductQuantity,
    incrementQuantity,
    decrementQuantity,
  };
}
