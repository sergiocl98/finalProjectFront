import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  user: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state){
      state.user = {};
    },
  }
});

export const selectUser = state => state.user;

export const userActions = userSlice.actions;