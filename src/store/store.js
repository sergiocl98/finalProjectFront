import { configureStore } from '@reduxjs/toolkit';
import { bookingSlice } from './slices/bookingSlice';
import { mapsSlice } from './slices/mapsSlice';
import { userSlice } from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    maps: mapsSlice.reducer,
    booking: bookingSlice.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

export default store;
