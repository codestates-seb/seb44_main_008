import { configureStore } from '@reduxjs/toolkit';
//import example from '../reducers/example';
import user from '../reducers/user';

export const store = configureStore({
  // reducer: { todo: example },
  reducer: { user: user },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
