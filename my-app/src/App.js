import { Dessert } from "./components/dessert/Dessert";
import { ShoppingCart } from "./components/shoppingCart/ShoppingCart";
import { CartConfirmation } from "./components/cartConfirmation/CartConfirmation";
import "./App.css";

function App() {
  return (
    <div className="app__container">
      <Dessert />
      <ShoppingCart />
      <CartConfirmation />
    </div>
  );
}

export default App;
