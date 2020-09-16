import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Context from '../context';
import Channel from './Channel';
import MessageForm from './MessageForm';
import getModal from './modals';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }
  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} hideModal={hideModal} />;
};

const App = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const messages = useSelector((state) => state.messages);
  const messagesOnCurrentChannel = messages.filter(
    (message) => message.channelId === currentChannelId,
  );

  const [modalInfo, setModalInfo] = useState({ type: null, channel: null });
  const hideModal = () => setModalInfo({ type: null, channel: null });
  const showModal = (type, channel = null) => setModalInfo({ type, channel });

  return (
    <Context.Consumer>
      {(name) => (
        <div className='row h-100 pb-3'>
          {renderModal({ modalInfo, hideModal })}
          <div className='col-3 border-right'>
            <div className='d-flex mb-2'>
              <span>Channels</span>
              <button
                className='btn btn-link p-0 ml-auto'
                onClick={() => showModal('add')}
              >+
              </button>
            </div>
            <ul className='nav flex-column nav-pills nav-fill'>
              {channels.map((channel) => (
                <Channel channel={channel} key={channel.name} showModal={showModal}/>
              ))}
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
