import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "./ShoppingCartSlice";
import rest from "../../rest/rest";
import { processUrl } from "../../utils";
import { LIMIT } from "../../constant";
import { RootState } from "../store";

type ProductCache = {
  data: Product[];
  lastFetched: number;
};
type ProductCategory = {
  slug: string;
  name: string;
  url: string;
};
interface ProductState {
  items: Product[];
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  selectedProduct: Product | null;
  queries: Record<string, ProductCache>;
  searchQuery: string | null;
  productCategories: ProductCategory[];
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ skip }: { skip: number }, { getState }) => {
    const url = processUrl("/products", {
      skip: skip,
      limit: LIMIT,
    });
    const response = await rest.get(url);
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: number) => {
    const response = await rest.get(`/products/${id}`);
    return response.data;
  }
);

export const fetchProductByQuery = createAsyncThunk(
  "products/fetchProductByQuery",
  async (query: string, { getState }) => {
    const { product } = getState() as RootState;
    const q: Record<string, ProductCache> = product.queries || {};
    if (q[query])
      return {
        query,
        products: q[query].data,
        lastFetched: q[query].lastFetched,
      };

    const url = processUrl("/products/search/", { q: query });
    const response = await rest.get(url);
    const data = response.data;
    return { query, products: data.products || [], lastFetched: Date.now() };
  }
);

export const fetchProductCategories = createAsyncThunk(
  "products/fetchProductCategories",
  async () => {
    const res = await rest("/products/categories");
    const data = res.data;
    return data;
  }
);

const initialState: ProductState = {
  items: [],
  selectedProduct: null,
  error: null,
  status: "idle",
  queries: {},
  searchQuery: null,
  productCategories: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state) => {
      return state;
    },
    clearProductList: (state) => {
      return {
        ...state,
        items: [],
        status: "idle",
        selectedProduct: null,
        error: null,
      };
    },
    cleanedQueries: (state, action) => {
      return { ...state, queries: action.payload };
    },
    updateSearchQuery: (state, action) => {
      return { ...state, searchQuery: action.payload };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...state.items, ...action.payload.products];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(fetchProductByQuery.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByQuery.fulfilled, (state, action) => {
        const { query, products, lastFetched } = action.payload;
        state.queries[query] = { data: products, lastFetched };
        state.items = products;
        state.status = "succeeded";
      })
      .addCase(fetchProductByQuery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(fetchProductCategories.fulfilled, (state, action) => {
        state.productCategories = action.payload;
      });
  },
});

export const {
  addProduct,
  clearProductList,
  cleanedQueries,
  updateSearchQuery,
} = productSlice.actions;
export default productSlice.reducer;
