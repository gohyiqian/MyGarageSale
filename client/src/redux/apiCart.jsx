import axios from "axios";
import { actions } from "./cartSlice";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  try {
    dispatch(
      actions.addItem({
        productId: data.id,
        name: data.name,
        image: data.image,
        price: data.price,
        stockCount: data.stockCount,
        qty,
      })
    );
  } catch (err) {
    console.log(err);
  }
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(actions.removeItem(id));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// export const saveShippingAddress = (data) => (dispatch) => {
//   dispatch(actions.saveShippingAddress(data));
//   localStorage.setItem("shippingAddress", JSON.stringify(data));
// };

// export const savePaymentMethodAction = (data) => (dispatch) => {
//   dispatch(actions.savePaymentMethod(data));
// };
