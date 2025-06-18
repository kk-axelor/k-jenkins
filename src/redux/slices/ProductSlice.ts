import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "./ShoppingCartSlice";
import rest from "../../rest/rest";

interface ProductState {
  items: Product[];
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await rest.get("/products/category/smartphones"); // Replace with your actual API endpoint
    return response.data;
  }
);

const initialState: ProductState = {
  items: [],
  error: null,
  status: "idle",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state) => {
      return state;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
