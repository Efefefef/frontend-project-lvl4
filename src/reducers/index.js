import {combineReducers} from 'redux';
import messageReducer from '../features/messages/messagesSlice';
import channelReducer from '../features/channels/channelsSlice';
import uiStateReducer from '../features/uiState/uiStateSlice';

export default combineReducers({
	channelsInfo: channelReducer,
	messages: messageReducer,
	uiState: uiStateReducer,
})

