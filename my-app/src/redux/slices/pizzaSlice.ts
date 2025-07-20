import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Pizza {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
}

interface PizzaState {
  items: Pizza[];
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzaState = {
  items: [],
  status: 'loading',
};

export interface FetchPizzasParams {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number;
  noLimit?: boolean;
}

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasParams>(
  'pizza/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const { sortBy, order, category, search, currentPage, noLimit } = params;
    let url = `https://680d6458c47cb8074d904fd5.mockapi.io/items?`;
    if (!noLimit) {
      url += `page=${currentPage}&limit=4&`;
    }
    url += `${category}&sortBy=${sortBy}&order=${order}${search}`;
    const { data } = await axios.get<Pizza[]>(url);
    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Пиццы пустые') as any;
    }
    return data;
  },
);

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: { pizza: PizzaState }) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
