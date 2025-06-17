import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  updateQuantity,
  clearCart,
} from "../../redux/slices/ShoppingCartSlice";

const ShoppingCart = () => {
  const { items, total } = useAppSelector((state) => state.shoppingCart);
  const dispatch = useAppDispatch();

  if (items.length === 0) {
    return (
      <div className="shopping-cart" data-testid="shopping-cart">
        <h2>Your Shopping Cart</h2>
        <p data-testid="empty-cart-message">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      <ul className="cart-items">
        {items.map((item) => (
          <li
            key={item.product.id}
            className="cart-item"
            data-testid="cart-item"
          >
            <div className="item-info">
              <h3>{item.product.name}</h3>
              <p>${item.product.price.toFixed(2)} each</p>
            </div>
            <div className="item-actions">
              <button
                onClick={() => {
                  dispatch(
                    updateQuantity({ productId: item.product.id, quantity: -1 })
                  );
                }}
                data-testid={`decrease-quantity-${item.product.id}`}
              >
                -
              </button>
              <span data-testid={`quantity-${item.product.id}`}>
                {item.quantity}
              </span>
              <button
                onClick={() => {
                  dispatch(
                    updateQuantity({ productId: item.product.id, quantity: 1 })
                  );
                }}
                data-testid={`increase-quantity-${item.product.id}`}
              >
                +
              </button>
              <button
                onClick={() => {}}
                className="remove-button"
                data-testid={`remove-item-${item.product.id}`}
              >
                D
              </button>
              <div className="item-total">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <div className="cart-total" data-testid="cart-total">
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>
        <button
          onClick={() => {
            dispatch(clearCart());
          }}
          className="clear-cart-button"
          data-testid="clear-cart-button"
        >
          Clear Cart
        </button>
        <button className="checkout-button" data-testid="checkout-button">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
