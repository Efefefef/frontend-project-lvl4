import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import routes from '../routes';
import Context from '../context';
import Channel from './Channel';
import MessageForm from './MessageForm';
import { addMessage } from '../features/messages/messagesSlice';
import { selectChannel } from '../features/channels/channelsSlice';
import { showAddModal, showRenameModal, showRemoveModal } from '../features/uiState/uiStateSlice';
import ChannelAdd from './modals/ChannelAddModal';
import ChannelRemove from './modals/ChannelRemoveModal';
import ChannelRename from './modals/ChannelRenameModal';

const mapStateToProps = (state) => {
  const { channelsInfo: { channels, currentChannelId }, messages, uiState: { modalShown } } = state;
  return {
    channels,
    currentChannelId,
    messages: messages.filter((message) => message.channelId === currentChannelId),
    modalShown,
  };
};

const mapDispatchToProps = {
  addMessage,
  selectChannel,
  showAddModal,
  showRenameModal,
  showRemoveModal,
};

const modalMapping = {
  add: <ChannelAdd/>,
  rename: <ChannelRename/>,
  remove: <ChannelRemove/>,
};

const showModal = (modal) => modalMapping[modal];


class App extends React.Component {
  componentDidMount() {
    const { addMessage } = this.props;
    const socket = io(routes.host);
    socket.on('newMessage', (msg) => {
      console.log(`message: ${JSON.stringify(msg)}`);
      const {
        data: {
          attributes: {
            body, channelId, nickname, id,
          },
        },
      } = msg;
      addMessage({
        body, channelId, nickname, id,
      });
    });
  }

  render() {
    const {
      messages, channels, currentChannelId, showAddModal, modalShown,
    } = this.props;
    return (
			<Context.Consumer>
				{(name) => (
					<div className='row h-100 pb-3'>
						{showModal(modalShown)}
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
								{channels.map((channel) => <Channel channel={channel} key={channel.name}/>)}
							</ul>
						</div>
						<div className='col h-100'>
							<div className='d-flex flex-column h-100'>
								<div id='message-box' className='chat-messages overflow-auto mb-3'>
									{messages.map((message) => (
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
