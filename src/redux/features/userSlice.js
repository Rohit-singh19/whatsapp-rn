/**
This handles the information of pim_stats 

*/

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isUserLoading: false,
  isVerifiedUser: false,
  userData: null,
  userError: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoading: state => {
      state.isUserLoading = true;
      state.userError = null;
    },
    successUser: (state, {payload}) => {
      state.isUserLoading = false;
      state.isVerifiedUser = true;
      state.userData = payload;
      state.isLoggedIn = true;
    },
    errorUser: (state, {payload}) => {
      state.isUserLoading = false;
      state.isVerifiedUser = false;
      state.userError = payload;
      state.isLoggedIn = false;
    },
    verifiedUser: (state, {payload}) => {
      state.isVerifiedUser = payload;
    },
  },
});

export const {userLoading, successUser, errorUser, verifiedUser} =
  userSlice.actions;

export default userSlice.reducer;
