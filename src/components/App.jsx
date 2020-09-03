import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import routes from '../routes';
import io from 'socket.io-client';
import Context from '../context';
import MessageForm from './MessageForm';
import { addMessage } from '../features/messages/messagesSlice';
import { selectChannel } from '../features/channels/channelsSlice';

const mapStateToProps = state => {
	const { channelsInfo: { channels, currentChannelId }, messages } = state;
	return {
		channels,
		currentChannelId,
		messages: messages.filter(message => message.channelId === currentChannelId),
	}
}

const mapDispatchToProps = {
	addMessage,
	selectChannel,
}

class App extends React.Component {

	componentDidMount() {
		const { addMessage } = this.props;
		const socket = io(routes.host);
		socket.on('newMessage', (msg) => {
			console.log('message: ' + JSON.stringify(msg));
			const { data: { attributes: { body, channelId, nickname, id } } } = msg;
			addMessage({ body, channelId, nickname, id })
		})
	}

	handleSelectChannel = (channelId) => () => {
		const { selectChannel } = this.props;
		selectChannel({ channelId });
	}

	render() {
		const { messages, channels, currentChannelId } = this.props;
		return (
			<Context.Consumer>
				{name => (
					<div className='row h-100 pb-3'>
						<div className='col-3 border-right'>
							<div className='d-flex mb-2'>
								<span>Channels</span>
								<button className='btn btn-link p-0 ml-auto'>+</button>
							</div>
							<ul className='nav flex-column nav-pills nav-fill'>
								{channels.map(channel => (
									<li key={channel.name} className='nav-item'>
										<button
											type='button'
											className={cn('nav-link', 'btn', 'btn-block', {
												'active': currentChannelId === channel.id
											})}
											onClick={this.handleSelectChannel(channel.id)}
										>
											{channel.name}
										</button>
									</li>
								))}
							</ul>
						</div>
						<div className='col h-100'>
							<div className='d-flex flex-column h-100'>
								<div id='message-box' className='chat-messages overflow-auto mb-3'>
									{messages.map(message => (
										<div key={message.id}>
											<b>{message.nickname}</b>: {message.body}
										</div>
									))}
								</div>
								<div className='mt-auto'>
									<MessageForm currentChannelId={currentChannelId} name={name}/>
								</div>
							</div>
						</div>
					</div>
				)}
			</Context.Consumer>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
