import { ProductState } from "@/types/productState";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ProductState = {
  isLoading: false,
  items: [], //[haha]
  error: null,
};

export const fetchData = createAsyncThunk("fetchData", async (_, thunkAPI) => {
  try {
    const response = await fetch(`${config.apiBaseUrl}/products`);
    console.log(`${config.apiBaseUrl}/products`);

    const products = await response.json(); //[haha]
    thunkAPI.dispatch(setProduct(products));
  } catch (error) {
    console.log(error);
  }
});

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.items = action.payload;
    },
  },
});

//{actions,reducer}

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
