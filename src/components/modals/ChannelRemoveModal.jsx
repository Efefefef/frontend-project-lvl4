import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Formik, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import routes from '../../routes';
import { removeChannel, selectChannel } from '../../features/channels/channelsSlice';
import { deleteMessagesForChannel } from '../../features/messages/messagesSlice';
import { hideModal } from '../../features/uiState/uiStateSlice';

const mapStateToProps = (state) => {
  const { uiState: { modalShown }, channelsInfo: { currentChannelId } } = state;
  return {
    modalShown,
    currentChannelId,
  };
};

const mapDispatchToProps = {
  removeChannel,
  hideModal,
  selectChannel,
  deleteMessagesForChannel,
};

const defaultChannel = 1;

const ChannelRemoveModal = ({
  modalShown, removeChannel, hideModal, currentChannelId, selectChannel, deleteMessagesForChannel,
}) => (
  <Modal show={modalShown === 'remove'} onHide={() => hideModal()}>
    <Modal.Header>
      <Modal.Title>Remove Channel</Modal.Title>
      <button className="close" type="button" onClick={() => hideModal()}>
        <span aria-hidden="true">×</span>
        <span className="sr-only">Close</span>
      </button>
    </Modal.Header>
    <Modal.Body>
      <Formik
        initialValues={{
          submission: '',
        }}
        onSubmit={async (values, { setFieldError }) => {
          try {
            await axios.delete(routes.channelPath(currentChannelId));
            deleteMessagesForChannel({ channelId: currentChannelId });
            removeChannel({ id: currentChannelId });
            selectChannel({ id: defaultChannel });
            hideModal();
          } catch (error) {
            setFieldError('submission', 'Network error');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className='row justify-content-center'>
              <button
                type='submit'
                className='btn btn-danger'
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
            <ErrorMessage
              name='submission'
              component='div'
              className='d-block invalid-feedback'
            />
          </Form>
        )}
      </Formik>
    </Modal.Body>
  </Modal>
);

export default connect(mapStateToProps, mapDispatchToProps)(ChannelRemoveModal);
