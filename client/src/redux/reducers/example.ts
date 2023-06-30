import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [{ id: 1, content: '하이' }],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, action) => {
      state.list = [
        ...state.list,
        { id: action.payload.id, content: action.payload.content },
      ];
    },
  },
});

const todoActions = todoSlice.actions;
export { todoActions };

export default todoSlice.reducer;
