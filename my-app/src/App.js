import { Cart } from "./cart/Cart";
import { UseProduct } from "./context/AppContext.jsx";
import { Desserts } from "./desserts/Desserts.jsx";
import { OrderConfirmation } from "./orderConfirmation/orderConfirmation.jsx";
import "./App.css";

function App() {
  const { isOpenOrderConfirm } = UseProduct();
  return (
    <div className="container">
      <Desserts />
      <Cart />
      {isOpenOrderConfirm && <OrderConfirmation />}
    </div>
  );
}

export default App;
