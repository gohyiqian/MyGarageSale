import axios from "axios";
import { actions as orderActions } from "./orderSlice";
import { actions as cartActions } from "./cartSlice";
// import store from "../store";
// const currentStoreState = store.getState();
// const { userInfo } = currentStoreState.user;
// console.log(userInfo);

// USER CREATE order
export const addOrder = (orderItems) => async (dispatch, getState) => {
  try {
    dispatch(orderActions.createOrderStart());
    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/orders/add/`,
      orderItems,
      authConfig
    );
    dispatch(orderActions.createOrderSuccess(data));

    localStorage.setItem(
      "orderItems",
      JSON.stringify(getState().order.orders.orderItems)
    );

    // clear cartItems after success order creation
    dispatch(cartActions.cartReset());
    localStorage.removeItem("cartItems");
  } catch (err) {
    dispatch(orderActions.createOrderFailure(err.message));
  }
};

// USER GET own order
export const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderActions.getOrderStart());
    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/`, authConfig);
    dispatch(orderActions.getOrderSuccess(data));
  } catch (err) {
    dispatch(orderActions.getOrderFailure(err.message));
  }
};

// GET order by ID
export const getOrderById = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderActions.getOrderByIdStart());
    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}/`, authConfig);
    dispatch(orderActions.getOrderByIdSuccess(data));
  } catch (err) {
    dispatch(orderActions.getOrderByIdFailure(err.message));
  }
};

//  UPDATE order paid
export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch(orderActions.payOrderStart());

    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `/api/orders/${id}/pay/`,
      paymentResult,
      authConfig
    );
    dispatch(orderActions.payOrderSuccess(data));
  } catch (err) {
    dispatch(
      orderActions.payOrderFailure(
        err.response ? err.response.data.detail : err.message
      )
    );
  }
};

//  ADMIN UPDATE order delivered
export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderActions.deliverOrderStart());
    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `/api/orders/${order.id}/deliver/`,
      {},
      authConfig
    );
    dispatch(orderActions.deliverOrderSuccess(data));
  } catch (err) {
    dispatch(orderActions.deliverOrderFailure(err.message));
  }
};

// ADMIN GET all orders
export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderActions.getAllOrdersStart());
    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/all/`, authConfig);
    dispatch(orderActions.getAllOrdersSuccess(data));
  } catch (err) {
    dispatch(orderActions.getAllOrdersFailure(err.message));
  }
};
