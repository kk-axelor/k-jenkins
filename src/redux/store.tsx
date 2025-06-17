import { configureStore } from "@reduxjs/toolkit";

import shoppingCartReducer from "./slices/ShoppingCartSlice";
import ProductReducer from "./slices/ProductSlice";
export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
    product: ProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
