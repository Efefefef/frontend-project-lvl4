import {createSlice} from '@reduxjs/toolkit';
import gon from 'gon';

const { channels, currentChannelId } = gon;

const initialState = {
	channels,
	currentChannelId
}

console.log(initialState)
const channelsSlice = createSlice({
	name: 'channelsInfo',
	initialState,
	reducers: {
		selectChannel(state, action) {
			const { channelId } = action.payload;
			state.currentChannelId = channelId;
		},
		addChannel(state, action) {
			const { name, id } = action.payload;
			state.channels.push({ name, id });
		}
	}
})

export const { selectChannel, addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
