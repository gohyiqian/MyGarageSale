import axios from "axios";
import { actions as shopActions } from "./shopSlice";

// CREATE SHOP
export const createShop = () => async (dispatch, getState) => {
  try {
    dispatch(shopActions.addShopStart());

    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/shops/create/", {}, authConfig);
    dispatch(shopActions.addShopSuccess(data));
  } catch (err) {
    dispatch(shopActions.addShopFailure(err.message));
  }
};

// GET SHOP
export const getShop = () => async (dispatch, getState) => {
  try {
    dispatch(shopActions.shopDetailStart());
    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/shops/`, authConfig);
    dispatch(shopActions.shopDetailSuccess(data));
  } catch (err) {
    dispatch(shopActions.shopDetailFailure(err.message));
  }
};

// UPDATE/EDIT SHOP
export const updateShop = (shop, id) => async (dispatch, getState) => {
  try {
    dispatch(shopActions.updateShopStart());

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
      `/api/shops/update/${shop.id}/`,
      shop,
      authConfig
    );
    dispatch(shopActions.updateShopSuccess(data));
  } catch (err) {
    dispatch(shopActions.updateShopFailure(err.message));
  }
};

// GET SHOP BY SHOP ID
export const getShopByShopId = (id) => async (dispatch) => {
  try {
    dispatch(shopActions.shopDetailStart());
    const { data } = await axios.get(`/api/shops/${id}/`);
    dispatch(shopActions.shopDetailSuccess(data));
  } catch (err) {
    dispatch(shopActions.shopDetailFailure(err.message));
  }
};

// GET SHOP BY USER ID
export const getShopByUserId = (id) => async (dispatch, getState) => {
  try {
    dispatch(shopActions.shopDetailStart());
    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/shops/user/${id}/`, authConfig);
    dispatch(shopActions.shopDetailSuccess(data));
  } catch (err) {
    dispatch(shopActions.shopDetailFailure(err.message));
  }
};

//  GET ALL SHOPS
export const getAllShops = (id) => async (dispatch) => {
  try {
    dispatch(shopActions.allShopStart());
    const { data } = await axios.get(`/api/shops/all/`);
    dispatch(shopActions.allShopSuccess(data));
  } catch (err) {
    dispatch(shopActions.allShopFailure(err.message));
  }
};

// DELETE SHOP
export const deleteShop = (id) => async (dispatch, getState) => {
  try {
    dispatch(shopActions.shopDeleteStart());
    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/shops/delete/${id}/`, authConfig);
    dispatch(shopActions.shopDeleteSuccess(data));
  } catch (err) {
    dispatch(shopActions.shopDeleteFailure(err.message));
  }
};
