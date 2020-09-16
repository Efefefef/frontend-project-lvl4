import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { selectChannel } from '../features/channels/channelsSlice';
import Icon from './Icons';

const renderButton = ({ modalName, showModal, channel }) => {
  const modalToIconMapping = {
    rename: 'pencil',
    remove: 'trash',
  };
  return (
    <button
      className='btn-outline-secondary border-0'
      style={{
        backgroundColor: 'transparent',
      }}
      onClick={() => showModal(modalName, channel)}
    >
      <Icon icon={modalToIconMapping[modalName]} color='black'/>
    </button>
  );
};

const Channel = ({ channel, showModal }) => {
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const dispatch = useDispatch();

  const handleSelectChannel = (id) => () => {
    dispatch(selectChannel({ id }));
  };

  return (
    <li className='nav-item'>
      <button
        type='button'
        className={cn('nav-link', 'btn', 'btn-block', 'pr-1', {
          active: currentChannelId === channel.id,
        })}
        onClick={handleSelectChannel(channel.id)}
      >
        <div className=''>
          {channel.name}
          {channel.removable && (
              <div className='d-flex align-items-end'>
                {renderButton({ modalName: 'rename', showModal, channel })}
                {renderButton({ modalName: 'remove', showModal, channel })}
              </div>
          )}
        </div>
      </button>
    </li>
  );
};


export default Channel;
