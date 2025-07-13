import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { sortBy, order, category, currentPage, noLimit } = params;
  const query = [
    noLimit ? null : `page=${currentPage}`,
    noLimit ? null : 'limit=4',
    category,
    `sortBy=${sortBy}`,
    `order=${order}`,
  ]
    .filter(Boolean)
    .join('&');
  const { data } = await axios.get(`https://680d6458c47cb8074d904fd5.mockapi.io/items?${query}`);
  return data;
});

const initialState = {
  items: [],
  status: 'loading', // loading | succes | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
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

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
