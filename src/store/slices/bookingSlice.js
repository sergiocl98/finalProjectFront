import { createSlice } from '@reduxjs/toolkit';

const getHalfHourTime = () => {
  const HALFHOUR = 1000 * 60 * 30;

  const today = new Date();
  const ms = today.getTime();
  const res = parseInt(ms / HALFHOUR) + 1;

  return new Date(res * HALFHOUR);
};

const initialState = {
  date: getHalfHourTime(),
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
