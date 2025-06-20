import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./ShoppingCartSlice";
import rest from "../../rest/rest";
import { processUrl } from "../../utils";
import { LIMIT } from "../../constant";
import { RootState } from "../store";

interface ProductState {
  items: Product[];
  error: string | null;
  searchQuery: string;
  status: "idle" | "loading" | "succeeded" | "failed";
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ skip }: { skip: number }, { getState }) => {
    const { product } = getState() as RootState;

    const url = processUrl(
      product.searchQuery ? "/products/search/" : "/products",
      {
        skip: skip,
        q: product.searchQuery,
        limit: LIMIT,
      }
    );
    const response = await rest.get(url);
    return response.data;
  }
);

const initialState: ProductState = {
  items: [],
  error: null,
  status: "idle",
  searchQuery: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state) => {
      return state;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.searchQuery) state.items = action.payload.products;
        else state.items = [...state.items, ...action.payload.products];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { addProduct, setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
