import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, action) {
      const {
        body, channelId, nickname, id,
      } = action.payload;
      state.push({
        body, channelId, nickname, id,
      });
    },
  },
  extraReducers: {
    'channelsInfo/removeChannel': (state, action) => {
      const { id } = action.payload;
      return state.filter((message) => message.channelId !== id);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
