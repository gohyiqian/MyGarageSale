import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter();

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    shippingAddress: JSON.parse(localStorage.getItem("shippingAddress")) || {},
    status: "idle",
    error: null,
  },
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const itemExistInCart = state.cartItems.find(
        (x) => x.productId === item.productId
      );
      // if exist, replace the item with new item
      if (itemExistInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            // if match, replace by new Item, if not return original item x
            x.productId === itemExistInCart.productId ? item : x
          ),
        };
      } else {
        // if item does not exist
        return {
          ...state, // return original state
          // return cartItems stae, and add new item to it
          cartItems: [...state.cartItems, item],
        };
      }
    },

    removeItem(state, action) {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productId !== action.payload
        ),
      };
    },

    incrementQty(state, action) {
      const item = state.cartItems.find((item) => item.id === action.payload);
      item.quantity++;
    },

    decrementQty(state, action) {
      const item = state.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload
        );
        state.splice(index, 1);
      } else {
        item.quantity--;
      }
    },

    saveShippingAddress(state, action) {
      return {
        ...state,
        shippingAddress: action.payload,
        status: "success",
      };
    },

    savePaymentMethod(state, action) {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    },
    allUsersReset: (state) => {
      state.status = "failed";
      state.users = [];
    },
    cartReset(state, action) {
      return {
        ...state,
        cartItems: [],
        shippingAddress: {},
      };
    },
    // cartAddOne: cartAdapter.addOne,
    // cartAddMany: cartAdapter.addMany,
    // cartUpdate: cartAdapter.updateOne,
    // cartRemove: cartAdapter.removeOne,
  },
});

//export all reducer actions for use in components
export const { actions } = cartSlice;
// console.log(actions);
export const cartSelectors = cartAdapter.getSelectors(
  (state) => state.cartItems
);
// console.log(cartSelectors);
export const cartReducer = cartSlice.reducer;
