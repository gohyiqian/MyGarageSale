import {
  createSlice,
  // createSelector,
  // createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();
// console.log(usersAdapter.getInitialState());
// _____________________________________________________________________________
// addMany: ƒ operation(state, arg)
// addOne: ƒ operation(state, arg)
// getInitialState: ƒ getInitialState(additionalState)
// getSelectors: ƒ getSelectors(selectState)
// removeAll: ƒ operation(state)
// removeMany: ƒ operation(state, arg)
// removeOne: ƒ operation(state, arg)
// selectId: ƒ (instance)
// setAll: ƒ operation(state, arg)
// setMany: ƒ operation(state, arg)
// setOne: ƒ operation(state, arg)
// sortComparer: false
// updateMany: ƒ operation(state, arg)
// updateOne: ƒ operation(state, arg)
// upsertMany: ƒ operation(state, arg)
// upsertOne: ƒ operation(state, arg)
// ______________________________________________________________________________

// export const getUsers = createAsyncThunk(
//   "users/getUsers", //action type string
//   // action payload creator callback function
//   async () => {
//     try {
//       const res = await fetch("https://randomuser.me/api/?results=10");
//       const data = await res.json();
//       const users = data.results;
//       // covert to JSON
//       const allUsers = users.map((user) => ({
//         id: user.login.uuid,
//         name: `${user.name.first}${user.name.last}`,
//         image: user.picture.thumbnail,
//       }));
//       return allUsers;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

const userSlice = createSlice({
  name: "users",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
    profileDetails: {},
    users: [],
    updateStatus: "idle",
    status: "idle",
    error: null,
  },
  reducers: {
    // USER LOGIN
    loginStart: (state) => {
      state.status = "loading";
    },
    loginSuccess: (state, action) => {
      state.status = "success";
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    // USER REGISTER
    registerStart: (state) => {
      state.status = "loading";
    },
    registerSuccess: (state, action) => {
      state.status = "success";
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    registerFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    // USER LOG OUT
    logOut: (state, action) => {
      localStorage.removeItem("userInfo");
      // localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingAddress");
      state.userInfo = action.payload;
    },
    // USER GET OWN PROFILE
    userDetailsStart(state) {
      return {
        ...state,
        status: "loading",
      };
    },
    userDetailsSuccess: (state, action) => {
      state.status = "success";
      state.profileDetails = action.payload;
    },
    userDetailsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    userDetailsReset: (state) => {
      state.status = "success";
      state.profileDetails = {};
    },
    // USER UPDATE OWN PROFILE
    userProfileUpdateStart: (state) => {
      state.status = "loading";
    },
    userProfileUpdateSuccess: (state, action) => {
      state.status = "success";
      // state.userInfo = {};
      state.profileDetails = action.payload;
    },
    userProfileUpdateFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    userProfileUpdateReset: (state) => {
      state.status = "success";
      state.profileDetails = {};
    },
    // ADMIN GET ALL USERS
    allUsersStart: (state) => {
      state.status = "loading";
    },
    allUsersSuccess: (state, action) => {
      state.status = "success";
      state.users = action.payload;
    },
    allUsersFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    allUsersReset: (state) => {
      state.status = "failed";
      state.users = [];
    },
    // ADMIN UPDATE user
    userUpdateStart: (state) => {
      state.updateStatus = "loading";
    },
    userUpdateSuccess: (state, action) => {
      state.updateStatus = "success";
      state.profileDetails = action.payload;
    },
    userUpdateFailure: (state, action) => {
      state.updateStatus = "failed";
      state.error = action.payload;
    },
    userUpdateReset: (state) => {
      state.status = "failed";
      state.profileDetails = {};
    },
    // ADMIN DELETE user
    userDeleteStart: (state) => {
      state.status = "loading";
    },
    userDeleteSuccess: (state) => {
      state.status = "success";
    },
    userDeleteFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    // usersSetAll: usersAdapter.setAll,
    // usersAddOne: usersAdapter.addOne,
    // usersAddMany: usersAdapter.addMany,
    // userUpdate: usersAdapter.updateOne,
    // userRemove: usersAdapter.removeOne,
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getUsers.pending, (state, action) => {
  //       state.status = "loading";
  //     })
  //     .addCase(getUsers.fulfilled, (state, action) => {
  //       state.users = action.payload;
  //       state.status = "succeeded";
  //     })
  //     .addCase(getUsers.rejected, (state, action) => {
  //       state.status = "failed";
  //     });
  // },
});

export const { actions } = userSlice;
// memoized selectors
export const userSelectors = usersAdapter.getSelectors((state) => state.users);
// the getSelectors method will return 5 selectors:
// selectAll - maps over state.ids array and return an array of entities
// selectIds - returns state.ids array
// selectTotal - returns total # of entities stored in this state
// selectById - given the state & entity ID, return the entity with that ID or undefined
// selectEntities - returns state.entities lookup table

export const userReducer = userSlice.reducer;
