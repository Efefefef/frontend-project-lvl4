import {createSlice} from '@reduxjs/toolkit';
import gon from 'gon';

const { channels, currentChannelId } = gon;

const initialState = {
	channels,
	currentChannelId
}

const channelsSlice = createSlice({
	name: 'channelsInfo',
	initialState,
	reducers: {
		selectChannel(state, action) {
			const { channelId } = action.payload;
			state.currentChannelId = channelId;
		},
		addChannel(state, action) {
			const { name, id, removable } = action.payload;
			state.channels.push({ name, id, removable });
		},
		renameChannel(state, action) {
			const { name, id } = action.payload;
			const renamedChannel = state.channels.find(channel => channel.id === id);
			renamedChannel.name = name;
		}
	}
})

export const { selectChannel, addChannel, renameChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
