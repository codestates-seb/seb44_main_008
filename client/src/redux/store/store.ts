import { configureStore } from '@reduxjs/toolkit';
import example from '../reducers/example';

export const store = configureStore({
  reducer: { todo: example },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
