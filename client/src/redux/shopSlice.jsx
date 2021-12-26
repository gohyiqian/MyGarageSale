import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shops",
  initialState: {
    shop: {},
    shops: {},
    status: "idle",
    error: null,
  },
  reducers: {
    // CREATE SHOP
    addShopStart: (state) => {
      state.status = "loading";
    },
    addShopSuccess: (state, action) => {
      state.status = "success";
      state.shop = action.payload;
    },
    addShopFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    // EDIT SHOP
    updateShopStart: (state) => {
      state.status = "loading";
    },
    updateShopSuccess: (state, action) => {
      state.status = "success";
      state.shop = action.payload;
    },
    updateShopFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    // GET SHOP BY SHOP ID
    shopDetailStart: (state) => {
      state.status = "loading";
    },
    shopDetailSuccess: (state, action) => {
      state.status = "success";
      state.shop = action.payload;
    },
    shopDetailFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    // GET All Shops
    allShopStart: (state) => {
      state.status = "loading";
    },
    allShopSuccess: (state, action) => {
      state.status = "success";
      state.shops = action.payload;
    },
    allShopFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    shopDeleteStart: (state) => {
      state.status = "loading";
    },
    shopDeleteSuccess: (state) => {
      state.status = "success";
    },
    shopDeleteFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { actions } = shopSlice;
export const shopReducer = shopSlice.reducer;
