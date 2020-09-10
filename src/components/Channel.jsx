import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { selectChannel } from '../features/channels/channelsSlice';
import { showRemoveModal, showRenameModal } from '../features/uiState/uiStateSlice';
import Icon from './Icons';

const Channel = ({ channel }) => {
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
        <div>
          {channel.name}
          {channel.removable ? (
              <div className='float-right'>
                <button
                  className='btn-outline-secondary border-0 mr-2'
                  style={{
                    backgroundColor: 'transparent',
                  }}
                  onClick={() => dispatch(showRenameModal())}
                >
                  <Icon icon='pencil' color='black'/>
                </button>
                <button
                  className='btn-outline-secondary border-0'
                  style={{
                    backgroundColor: 'transparent',
                  }}
                  onClick={() => dispatch(showRemoveModal())}
                >
                  <Icon icon='trash' color='black'/>
                </button>
              </div>
          )
            : null}
        </div>
      </button>
    </li>
  );
};

export default Channel;
