import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import routes from '../routes';
import Context from '../context';
import Channel from './Channel';
import MessageForm from './MessageForm';
import { addMessage } from '../features/messages/messagesSlice';
import { showAddModal } from '../features/uiState/uiStateSlice';
import ChannelAdd from './modals/ChannelAddModal';
import ChannelRemove from './modals/ChannelRemoveModal';
import ChannelRename from './modals/ChannelRenameModal';

const modalMapping = {
  add: <ChannelAdd/>,
  rename: <ChannelRename/>,
  remove: <ChannelRemove/>,
};

const renderModal = (modal) => modalMapping[modal];


const App = () => {
  const modalShown = useSelector((state) => state.uiState.modalShown);
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const messages = useSelector((state) => state.messages);
  const messagesOnCurrentChannel = messages.filter(
    (message) => message.channelId === currentChannelId,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(routes.host);
    socket.on('newMessage', (msg) => {
      const {
        data: {
          attributes: {
            body, channelId, nickname, id,
          },
        },
      } = msg;
      dispatch(addMessage({
        body, channelId, nickname, id,
      }));
    });
  }, []);

  return (
    <Context.Consumer>
      {(name) => (
        <div className='row h-100 pb-3'>
          {renderModal(modalShown)}
          <div className='col-3 border-right'>
            <div className='d-flex mb-2'>
              <span>Channels</span>
              <button
                className='btn btn-link p-0 ml-auto'
                onClick={() => dispatch(showAddModal())}
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
                {messagesOnCurrentChannel.map(({ id, nickname, body }) => (
                  <div key={id}>
                    <b>{nickname}</b>: {body}
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
};

export default App;
