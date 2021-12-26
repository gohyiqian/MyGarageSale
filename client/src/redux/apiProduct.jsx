import { actions } from "./productSlice";
import axios from "axios";

// const config = {
//   headers: {
//     "Content-type": "application/json",
//   },
// };

// GET A PRODUCT
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch(actions.productDetailStart());
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(actions.productDetailSuccess(data));
  } catch (err) {
    dispatch(actions.productDetailFailure(err.message));
  }
};

//  GET TOP PRODUCTS
export const getTopProduct = () => async (dispatch) => {
  try {
    dispatch(actions.productTopStart());
    const { data } = await axios.get(`/api/products/top/`);
    dispatch(actions.productTopSuccess(data));
  } catch (err) {
    dispatch(actions.productTopFailure(err.message));
  }
};

//  ADMIN GET PRODUCTS BY KEYWORDS SEARCH ON PRODUCT NAMES
export const getProductsByKeyword =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch(actions.listProductsByKeywordStart());
      const { data } = await axios.get(`/api/products${keyword}`); //?keyword=shirt&page=1
      dispatch(actions.listProductsByKeywordSuccess(data));
    } catch (err) {
      dispatch(actions.listProductsByKeywordFailure(err.message));
    }
  };

//  ADMIN GET PRODUCTS BY CATEGORY SEARCH ON CLICK
export const getProductsByCategory =
  (category = "") =>
  async (dispatch) => {
    try {
      dispatch(actions.listProductsByCatStart());
      const { data } = await axios.get(`/api/products/category/${category}`); //?category=shirt&page=1
      dispatch(actions.listProductsByCatSuccess(data));
    } catch (err) {
      dispatch(actions.listProductsByCatFailure(err.message));
    }
  };

//  ADMIN GET PRODUCTS BY SHOP
export const getProductsByShop = (id) => async (dispatch) => {
  try {
    dispatch(actions.listProductsByKeywordStart());
    const { data } = await axios.get(`/api/products/shop/?shop=${id}`);
    dispatch(actions.listProductsByKeywordSuccess(data));
  } catch (err) {
    dispatch(actions.listProductsByKeywordFailure(err.message));
  }
};

// ADMIN - CREATE PRODUCT
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch(actions.productCreateStart());
    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/products/create/`, {}, authConfig);
    dispatch(actions.productCreateSuccess(data));
  } catch (err) {
    dispatch(actions.productCreateFailure(err.message));
  }
};

// ADMIN - UPDATE PRODUCT
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(actions.productUpdateStart());
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
      `/api/products/update/${product.id}/`,
      product,
      authConfig
    );
    dispatch(actions.productUpdateSuccess(data));
  } catch (err) {
    dispatch(actions.productUpdateFailure(err.message));
  }
};

// ADMIN - DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch(actions.productDeleteStart());
    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(
      `/api/products/delete/${id}/`,
      authConfig
    );
    dispatch(actions.productDeleteSuccess(data));
  } catch (err) {
    dispatch(actions.productDeleteFailure(err.message));
  }
};

// CREATE PRODUCT REVIEW
export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch(actions.createReviewStart());

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
        `/api/products/${productId}/reviews/`,
        review,
        authConfig
      );
      dispatch(actions.createReviewSuccess(data));
    } catch (err) {
      dispatch(actions.createReviewFailure(err.message));
    }
  };

// SELLER - CREATE PRODUCT
export const createShopProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch(actions.productCreateStart());
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
      `/api/products/shop/create/${id}/`,
      {},
      authConfig
    );
    dispatch(actions.productCreateSuccess(data));
  } catch (err) {
    dispatch(actions.productCreateFailure(err.message));
  }
};

// SELLER - UPDATE PRODUCT
export const updateShopProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(actions.productUpdateStart());
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
      `/api/products/shop/update/${product.id}/`,
      product,
      authConfig
    );
    dispatch(actions.productUpdateSuccess(data));
  } catch (err) {
    dispatch(actions.productUpdateFailure(err.message));
  }
};
