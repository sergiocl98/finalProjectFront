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
  people: 0,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setDate(state, action) {
      state.date = new Date(action.payload);
    },
    setPeople(state, action) {
      state.people = action.payload;
    },
  },
});

export const { setDate, setPeople } = bookingSlice.actions;
export const selectActions = bookingSlice.actions;
