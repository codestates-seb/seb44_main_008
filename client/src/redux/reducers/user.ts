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
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
