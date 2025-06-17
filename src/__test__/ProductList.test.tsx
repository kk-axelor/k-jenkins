import { configureStore } from "@reduxjs/toolkit";

import shoppingCartReducer from "../redux/slices/ShoppingCartSlice";
import productsReducer from "../redux/slices/ProductSlice";

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ProductList from "../components/shopping/ProductList";

describe("ProductList Component", () => {
  const renderWithRedux = () => {
    const store = configureStore({
      reducer: {
        shoppingCart: shoppingCartReducer,
        product: productsReducer,
      },
    });
    return render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );
  };

  it("renders product list correctly", () => {
    renderWithRedux();
    expect(screen.getByText(/Available products/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("product-item").length).toBeGreaterThan(0);
    expect(screen.getByText("Smartphone")).toBeInTheDocument();
    expect(screen.getByText("Laptop")).toBeInTheDocument();
  });
});
