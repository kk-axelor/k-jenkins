import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer from "./slices/ShoppingCartSlice";
import ProductReducer from "./slices/ProductSlice";
import { queryCacheCleaner } from "./middleware/ProductMiddleware";

export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
    product: ProductReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(queryCacheCleaner);
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
