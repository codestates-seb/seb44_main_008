import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User, UserInfo } from './usertype';

const initialState: User = {
  isLoggedIn: true,
  userInfo: {
    id: 1,
    user_img:
      'https://i.pinimg.com/564x/c6/75/37/c67537a607e37016cd65de01fb4bf437.jpg',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
  },
});

const userActions = userSlice.actions;
export { userActions };

export default userSlice.reducer;
