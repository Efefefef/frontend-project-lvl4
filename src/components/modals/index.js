import ChannelAdd from './ChannelAdd';
import ChannelRemove from './ChannelRemove';
import ChannelRename from './ChannelRename';

const modals = {
  add: ChannelAdd,
  remove: ChannelRemove,
  rename: ChannelRename,
};

export default (modalName) => modals[modalName];
