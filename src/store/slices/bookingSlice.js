import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: new Date(),
  local: null,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setDate(state, action) {
      state.date = new Date(action.payload);
    },
  },
});

export const { setDate, setLocal } = bookingSlice.actions;
export const selectActions = bookingSlice.actions;
