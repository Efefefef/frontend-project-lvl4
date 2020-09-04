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
			console.log('add')
			const { name, id, removable } = action.payload;
			state.channels.push({ name, id, removable });
		}
	}
})

export const { selectChannel, addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
