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
			console.log('select')
		},
	}
})

export const { selectChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
