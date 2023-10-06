import { Cart, CartState, Option, Option2 } from "@/types/cartState";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

export const confirmOrder = createAsyncThunk(
  "confirmOrder",
  async (options: Option, thunkAPI) => {
    const { payload, onSuccess, onError } = options;
    try {
      const resposne = await fetch(`${config.apiBaseUrl}/order`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await resposne.json();
      onSuccess && onSuccess(data);
    } catch (error) {
      onError && onError();
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "cancelOrder",
  async (options2: Option2, tunkAPI) => {
    const { orderId, onSuccess, onError } = options2;
    try {
      await fetch(`${config.apiBaseUrl}/order/${orderId}`, {
        method: "DELETE",
      });
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

//http://localhost:3000/api/order
//confirmOrder(2)// payload = 2

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload]; // [1] copy / [payload2] = [1,2]
    },
    updateQuantity: (state, action) => {
      //{id:3,qaun: 4}
      const quantity = action.payload.quantity;
      const id = action.payload.id;
      if (quantity === 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        state.items = state.items.map((item) =>
          item.id === id ? { ...item, quantity: quantity } : item
        );
      }
    },
  },
});

export const { addToCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
