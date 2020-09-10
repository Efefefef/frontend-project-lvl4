import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';

const { messages } = gon;

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messages,
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
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
