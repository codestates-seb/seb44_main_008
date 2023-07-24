import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from './usertype';

const initialState: User = {
  isLoggedIn: false,
  userInfo: {
    id: 0,
    name: '',
    nickname: '',
    user_img: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userInfo = action.payload.userInfo;
    },
    updateProfileImage: (state, action: PayloadAction<string>) => {
      state.userInfo.user_img = action.payload;
    },
    clearUser: state => {
      state.isLoggedIn = false;
      state.userInfo = initialState.userInfo;
    },
  },
});

export const { setUser, clearUser, updateProfileImage } = userSlice.actions;

export default userSlice.reducer;
