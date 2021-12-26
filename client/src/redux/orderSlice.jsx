import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const orderAdapter = createEntityAdapter();

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: {},
    status: "idle",
    payStatus: "idle",
    deliverStatus: "idle",
    error: null,
    orderList: [],
  },
  reducers: {
    // USER CREATE order
    createOrderStart: (state) => {
      state.status = "loading";
    },
    createOrderSuccess: (state, action) => {
      state.status = "success";
      state.orders = action.payload;
    },
    createOrderFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    createOrderReset: (state) => {
      state.status = "reset";
      state.orders = {};
    },

    // USER GET own order
    getOrderStart(state) {
      return {
        ...state,
        status: "loading",
      };
    },
    getOrderSuccess: (state, action) => {
      state.status = "success";
      state.orderList = action.payload;
    },
    getOrderFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    getOrderReset: (state) => {
      state.orderList = [];
    },

    // USER GET order by ID
    getOrderByIdStart(state, action) {
      return {
        ...state,
        status: "loading",
      };
    },
    getOrderByIdSuccess: (state, action) => {
      state.status = "success";
      state.orders = action.payload;
    },
    getOrderByIdFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    // UPATE order pay
    payOrderStart: (state, action) => {
      state.payStatus = "loading";
    },
    payOrderSuccess(state, action) {
      state.payStatus = "success";
      state.orders = action.payload;
    },
    payOrderFailure: (state, action) => {
      state.payStatus = "failed";
      state.error = action.payload;
    },
    payOrderReset(state, action) {
      state.payStatus = "idle";
    },

    // ADMIN UPDATE set delivered
    deliverOrderStart: (state, action) => {
      state.deliverStatus = "loading";
    },
    deliverOrderSuccess: (state, action) => {
      state.deliverStatus = "success";
    },
    deliverOrderFailure: (state, action) => {
      state.deliverStatus = "failed";
      state.error = action.payload;
    },
    deliverOrderReset(state, action) {
      state.deliverStatus = "idle";
    },

    // ADMIN get all orders
    getAllOrdersStart: (state, action) => {
      state.status = "loading";
    },
    getAllOrdersSuccess: (state, action) => {
      state.status = "success";
      state.orderList = action.payload;
    },
    getAllOrdersFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

//export all reducer actions for use in components

export const { actions } = orderSlice;

export const orderSelectors = orderAdapter.getSelectors(
  (state) => state.orderItems
);

export const orderReducer = orderSlice.reducer;
