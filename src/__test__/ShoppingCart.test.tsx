import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../redux/slices/ProductSlice";
import ShoppingCartReducer, {
  addToCart,
} from "../redux/slices/ShoppingCartSlice";
import { Provider } from "react-redux";
import ShoppingCart from "../components/shopping/ShoppingCart";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ShoppingCart Component", () => {
  const createTestStore = () => {
    return configureStore({
      reducer: {
        product: ProductReducer,
        shoppingCart: ShoppingCartReducer,
      },
    });
  };
  const renderWithRedux = (store: any) => {
    return render(
      <Provider store={store}>
        <ShoppingCart />
      </Provider>
    );
  };

  it("renders empty cart message when cart is empty", () => {
    const store = createTestStore();
    renderWithRedux(store);

    const emptyCartMessage = screen.getByText(/your cart is empty/i);
    expect(emptyCartMessage).toBeInTheDocument();
  });

  it("renders cart items when iterm are in the cart", () => {
    const store = createTestStore();

    store.dispatch(
      addToCart({
        id: 1,
        name: "Smartphone",
        price: 699.99,
        description: "Latest model with high-resolution camera",
        image: "https://via.placeholder.com/150",
      })
    );
    renderWithRedux(store);

    expect(screen.getByText(/smartphone/i)).toBeInTheDocument();
    expect(screen.queryByTestId("empty-cart-message")).not.toBeInTheDocument();

    expect(screen.getByTestId("cart-item")).toBeInTheDocument();
    expect(screen.getByTestId("cart-total")).toHaveTextContent("$699.99");
  });

  it("allows updating item quantity", async () => {
    const user = userEvent.setup();
    const store = createTestStore();
    store.dispatch(
      addToCart({
        id: 1,
        name: "Smartphone",
        price: 699.99,
        description: "Latest model with high-resolution camera",
        image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      })
    );
    renderWithRedux(store);

    expect(screen.getByTestId("quantity-1").textContent).toBe("1");
    await user.click(screen.getByTestId("increase-quantity-1"));
    await user.click(screen.getByTestId("increase-quantity-1"));
    expect(screen.getByTestId("cart-total")).toHaveTextContent("$2099.97");
    expect(screen.getByTestId("quantity-1").textContent).toBe("3");
    await user.click(screen.getByTestId("decrease-quantity-1"));
    expect(screen.getByTestId("cart-total")).toHaveTextContent("$1399.98");
  });

  it("allows removing items from the cart", async () => {
    const store = createTestStore();
    const user = userEvent.setup();

    // Add multiple items to the cart
    store.dispatch(
      addToCart({
        id: 1,
        name: "Smartphone",
        price: 699.99,
        description: "Latest model with high-resolution camera",
        image: "https://via.placeholder.com/150",
      })
    );

    store.dispatch(
      addToCart({
        id: 2,
        name: "Laptop",
        price: 1299.99,
        description: "Powerful laptop for work and gaming",
        image: "https://via.placeholder.com/150",
      })
    );

    renderWithRedux(store);

    expect(screen.getAllByTestId("cart-item").length).toBe(2);
    await user.click(screen.getByTestId("clear-cart-button"));

    expect(screen.queryByTestId("cart-item")).not.toBeInTheDocument();
    expect(screen.getByTestId("empty-cart-message")).toBeInTheDocument();
  });
});
