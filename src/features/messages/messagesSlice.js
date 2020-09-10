import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: null,
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
