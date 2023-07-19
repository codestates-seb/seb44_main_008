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
  initialState: { value: initialState },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    updateProfileImage: (state, action: PayloadAction<string | null>) => {
      state.value.userInfo.user_img = action.payload;
    },
    clearUser: state => {
      return state.value.isLoggedIn;
    },
  },
});

export const { setUser, clearUser, updateProfileImage } = userSlice.actions;

export default userSlice.reducer;
