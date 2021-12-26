import { actions as userActions } from "./userSlice";
import axios from "axios";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

// USER LOGIN
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch(userActions.loginStart());
    const { data } = await axios.post(
      "/api/users/login/",
      { username: username, password: password },
      config
    );
    dispatch(userActions.loginSuccess(data));
  } catch (err) {
    dispatch(userActions.loginFailure(err.response.data.detail));
  }
};

// USER REGISTER
export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch(userActions.registerStart());
    const { data } = await axios.post(
      "/api/users/register/",
      {
        username: username,
        email: email,
        // usertype: usertype,
        // is_seller: isSeller,
        // is_buyer: isBuyer,
        password: password,
      },
      config
    );

    dispatch(userActions.registerSuccess(data));
  } catch (err) {
    dispatch(userActions.registerFailure(err.response.data.detail));
  }
};

// GET USER DETAILS
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(userActions.userDetailsStart());

    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}/`, authConfig);
    dispatch(userActions.userDetailsSuccess(data));
  } catch (err) {
    dispatch(userActions.userDetailsFailure(err.message));
  }
};

// USER UPDATE OWN PROFILE
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userActions.userProfileUpdateStart());
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
      `/api/users/profile/update/`,
      user,
      authConfig
    );
    dispatch(userActions.userProfileUpdateSuccess(data));
    dispatch(userActions.loginSuccess(data));
  } catch (err) {
    dispatch(userActions.userProfileUpdateFailure(err.message));
  }
};

// ADMIN GET ALL USERS
export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch(userActions.allUsersStart());

    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/`, authConfig);
    dispatch(userActions.allUsersSuccess(data));
  } catch (err) {
    dispatch(userActions.allUsersFailure(err.message));
  }
};

// ADMIN UPDATE USER
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch(userActions.userUpdateStart());
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
      `/api/users/update/${user.id}/`,
      user,
      authConfig
    );
    dispatch(userActions.userUpdateSuccess(data));
  } catch (err) {
    dispatch(userActions.userUpdateFailure(err.message));
  }
};

// ADMIN DELETE USER
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch(userActions.userDeleteStart());
    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/users/delete/${id}/`, authConfig);
    dispatch(userActions.userDeleteSuccess(data));
  } catch (err) {
    dispatch(userActions.userDeleteFailure(err.message));
  }
};
