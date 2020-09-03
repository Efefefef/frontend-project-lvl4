import {combineReducers} from 'redux';
import messageReducer from '../features/messages/messagesSlice';
import channelReducer from '../features/channels/channelsSlice';

export default combineReducers({
	channelsInfo: channelReducer,
	messages: messageReducer,
})

