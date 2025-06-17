import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./ShoppingCartSlice";

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [
    {
      id: 1,
      name: "Smartphone",
      price: 699.99,
      description: "Latest model with high-resolution camera",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Laptop",
      price: 1299.99,
      description: "Powerful laptop for work and gaming",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Headphones",
      price: 199.99,
      description: "Noise-cancelling wireless headphones",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Smartwatch",
      price: 249.99,
      description: "Track your fitness and stay connected",
      image: "https://via.placeholder.com/150",
    },
  ],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state) => {
      return state;
    },
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
