import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from '../../services/userService';

const initialState = {
  status: 'idle',
  user: {},
  userDetail: {}
};

// Actions
export const fetchUserById = createAsyncThunk(
  'user/getUserById', 
  async (id, { rejectWithValue }) => {
    try {
      const response = await userService.getUserById(id);
      return response;
    } catch (err) {
      return rejectWithValue('Error');
    }
  }
);

export const putUserById = createAsyncThunk(
  'user/putUserById', 
  async ({id,user}, { rejectWithValue }) => {
    try {
      const response = await userService.editUserById({id: id,user: user});
      return response;
    } catch (err) {
      return rejectWithValue('Error');
    }
  }
);

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
    reset: () => initialState
  },
  extraReducers: {
    [fetchUserById.pending]: (state) => {
      state.status = 'loading';
      state.loading = true;
    },
    [fetchUserById.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      state.userDetail = payload;
      state.error = payload?.error;
      state.loading = false;
    },
    [fetchUserById.rejected]: (state, { payload }) => {
      state.status = 'failed';
      state.error = payload;
      state.loading = false;
    },
    [putUserById.pending]: (state) => {
      state.status = 'loading';
      state.loading = true;
    },
    [putUserById.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      state.userDetail = payload;
      state.error = payload?.error;
      state.loading = false;
    },
    [putUserById.rejected]: (state, { payload }) => {
      state.status = 'failed';
      state.error = payload;
      state.loading = false;
    },
  }
});

export const selectUser = state => state.user;
export const SELECT_USER_DETAIL = state => state.user.userDetail;

export const userActions = userSlice.actions;