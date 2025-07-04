import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface ShoppingCartState {
  items: CartItem[];
  likeItems: Array<Number>;
  total: number;
  isOpen: boolean;
}

const initialState: ShoppingCartState = {
  items: [],
  likeItems: [],
  total: 0,
  isOpen: false,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
      state.total = calculateTotal(state.items);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);

      if (item) {
        item.quantity += quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.product.id !== productId
          );
        }
      }

      state.total = calculateTotal(state.items);
    },

    clearCart: (state) => {
      return initialState;
    },
    removeProduct: (state, action: PayloadAction<{ productId: number }>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload.productId
      );
      state.total = calculateTotal(state.items);
    },
    toogleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    addToLikeCategory: (state, action) => {
      state.likeItems.push(action.payload.id);
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  clearCart,
  toogleCart,
  removeProduct,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
