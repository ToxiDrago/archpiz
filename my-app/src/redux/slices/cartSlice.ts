import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS.ts';
import { calcTotalPrice } from '../../utils/calcTotalPrice.ts';

export interface CartItem {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

const { items, totalPrice} = getCartFromLS();

const initialState: CartState = {
  items: items,
  totalPrice: totalPrice,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
      addItem(state, action: PayloadAction<Omit<CartItem, 'count'>>) {
    const findItem = state.items.find((obj) => obj.id === action.payload.id);
    if (findItem) {
      findItem.count++;
    } else {
      state.items.push({ ...action.payload, count: 1 });
    }
    state.totalPrice = calcTotalPrice(state.items);
  },
    plusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count++;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
      minusItem(state, action: PayloadAction<string>) {
    const findItem = state.items.find((obj) => obj.id === action.payload);
    if (findItem) {
      findItem.count--;
    }
    state.totalPrice = calcTotalPrice(state.items);
  },

  removeItem(state, action: PayloadAction<string>) {
    state.items = state.items.filter((obj) => obj.id !== action.payload);
    state.totalPrice = calcTotalPrice(state.items);
  },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: { cart: CartState }) => state.cart;
export const selectCartItemById = (id: string) => (state: { cart: CartState }) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, plusItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
