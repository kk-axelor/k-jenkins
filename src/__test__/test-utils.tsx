import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer, {
  Product,
} from "../redux/slices/ShoppingCartSlice";
import productReducer, { ProductState } from "../redux/slices/ProductSlice";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
export function renderWithProvider(ui: React.ReactElement, initialState = {}) {
  const mockProducts = [
    {
      id: 1,
      title: "Test Product",
      description: "Test description",
      price: 9.99,
      thumbnail: "test-image.jpg",
    },
  ] as Product[];
  const store = configureStore({
    reducer: {
      shoppingCart: shoppingCartReducer,
      product: productReducer,
    },
    preloadedState: {
      product: {
        items: mockProducts,
        selectedProduct: null,
        error: null,
        status: "succeeded",
        queries: {},
        searchQuery: null,
        productCategories: [],
      } as ProductState,
      shoppingCart: {
        items: [],
        likeItems: [],
        total: 0,
        isOpen: false,
      },
      ...initialState,
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}
