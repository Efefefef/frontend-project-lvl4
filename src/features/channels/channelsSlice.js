/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {},
  reducers: {
    selectChannel(state, action) {
      const { id } = action.payload;
      state.currentChannelId = id;
    },
    addChannel(state, action) {
      const { name, id, removable } = action.payload;
      state.channels.push({ name, id, removable });
    },
    renameChannel(state, action) {
      const { name, id } = action.payload;
      const renamedChannel = state.channels.find((channel) => channel.id === id);
      renamedChannel.name = name;
    },
    removeChannel(state, action) {
      const { id } = action.payload;
      return {
        ...state,
        channels: state.channels.filter((channel) => channel.id !== id),
      };
    },
  },
});

export const {
  selectChannel, addChannel, renameChannel, removeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
