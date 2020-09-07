import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import routes from '../routes';
import io from 'socket.io-client';
import Context from '../context';
import MessageForm from './MessageForm';
import { addMessage } from '../features/messages/messagesSlice';
import { selectChannel } from '../features/channels/channelsSlice';
import { showAddModal, showRenameModal, showRemoveModal } from '../features/uiState/uiStateSlice';
import ChannelAdd from './modals/ChannelAdd';
// import ChannelRemove from './modals/ChannelRemove';
import ChannelRename from './modals/ChannelRename';

const mapStateToProps = state => {
	const { channelsInfo: { channels, currentChannelId }, messages, uiState: { modals } } = state;
	return {
		channels,
		currentChannelId,
		messages: messages.filter(message => message.channelId === currentChannelId),
		modals
	}
}

const mapDispatchToProps = {
	addMessage,
	selectChannel,
	showAddModal,
	showRenameModal,
	showRemoveModal,
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
		const { messages, channels, currentChannelId, modals, showAddModal, showRenameModal } = this.props;
		return (
			<Context.Consumer>
				{name => (
					<div className='row h-100 pb-3'>
						<ChannelAdd show={modals.add.isShown}/>
						<ChannelRename show={modals.rename.isShown} channelId={modals.rename.channelId}/>
						<div className='col-3 border-right'>
							<div className='d-flex mb-2'>
								<span>Channels</span>
								<button
									className='btn btn-link p-0 ml-auto'
									onClick={showAddModal}
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
											<div>
												{channel.name}
												{channel.removable ? (
														<button
															className='btn-outline-secondary border-0 float-right'
															onClick={() => showRenameModal({ channelId: channel.id })}
														>
															<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil"
															     fill="currentColor"
															     xmlns="http://www.w3.org/2000/svg">
																<path fillRule="evenodd"
																      d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
															</svg>
														</button>
													)
													: null}
											</div>
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
