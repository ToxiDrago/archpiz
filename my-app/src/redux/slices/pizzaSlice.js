import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * @typedef {Object} FetchPizzasParams
 * @property {string} sortBy
 * @property {string} order
 * @property {string} category
 * @property {string} [search]
 * @property {number} currentPage
 * @property {boolean} [noLimit]
 */

/**
 * @type {import('@reduxjs/toolkit').AsyncThunk<any, FetchPizzasParams>
 */
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
  const { sortBy, order, category, search, currentPage, noLimit } = params;
  let url = `https://680d6458c47cb8074d904fd5.mockapi.io/items?`;
  if (!noLimit) {
    url += `page=${currentPage}&limit=4&`;
  }
  url += `${category}&sortBy=${sortBy}&order=${order}${search}`;
  const { data } = await axios.get(url);

  if (data.length === 0) {
    return thunkAPI.rejectWithValue('Пиццы пустые');
  }

  return thunkAPI.fulfillWithValue(data);
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

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
