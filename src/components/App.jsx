import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import routes from '../routes';
import io from 'socket.io-client';
import Context from '../context';
import MessageForm from './MessageForm';
import { addMessage } from '../features/messages/messagesSlice';
import { selectChannel, addChannel } from '../features/channels/channelsSlice';
import ChannelAdd from './modals/ChannelAdd';
// import ChannelRemove from './modals/ChannelRemove';
// import ChannelRename from './modals/ChannelRename';

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
	addChannel
}

class App extends React.Component {
	state = {
		modalToShow: null,
	}

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

	setModalToShow = (modalName) => {
		this.setState({ modalToShow: modalName });
	}

	handleAddChannel = () => {
		this.setModalToShow('add');
	}

	closeModal = () => {
		this.setState({ modalToShow: null });
	}

	showModal = (modalToShow) => {
		const { addChannel } = this.props;
		const modals = {
			add: <ChannelAdd addChannel={addChannel} closeModal={this.closeModal}/>,
			// remove: <ChannelRemove closeModal={this.closeModal}/>,
			// rename: <ChannelRename closeModal={this.closeModal}/>,
		}
		console.log(modals[modalToShow])
		return modals[modalToShow];
	}

	render() {
		const { messages, channels, currentChannelId } = this.props;
		return (
			<Context.Consumer>
				{name => (
					<div className='row h-100 pb-3'>
						{this.showModal(this.state.modalToShow)}
						<div className='col-3 border-right'>
							<div className='d-flex mb-2'>
								<span>Channels</span>
								<button
									className='btn btn-link p-0 ml-auto'
									onClick={this.handleAddChannel}
								>+
								</button>
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
