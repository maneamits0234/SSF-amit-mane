import { Outlet, ScrollRestoration } from "react-router";
import { Header } from "./components/Header";
import { Cart } from "./components/Cart";
import { useCart } from "./context/CartContext";

export function Layout() {
  const { cartOpen, setCartOpen, cartItems, onUpdateQuantity, onRemoveItem } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <ScrollRestoration />
      <Header cartItemCount={totalItems} onCartClick={() => setCartOpen(true)} />
      <Outlet />
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
      />
    </div>
  );
}
