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
    deleteMessagesForChannel(state, action) {
      const { channelId } = action.payload;
      return state.filter((message) => message.channelId !== channelId);
    },
  },
});

export const { addMessage, deleteMessagesForChannel } = messagesSlice.actions;

export default messagesSlice.reducer;
