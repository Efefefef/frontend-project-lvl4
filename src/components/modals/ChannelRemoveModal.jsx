import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Formik, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import routes from '../../routes';
import { removeChannel, selectChannel } from '../../features/channels/channelsSlice';
import { deleteMessagesForChannel } from '../../features/messages/messagesSlice';
import { hideModal } from '../../features/uiState/uiStateSlice';

const defaultChannel = 1;

const ChannelRemoveModal = () => {
  const modalShown = useSelector((state) => state.uiState.modalShown);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const dispatch = useDispatch();

  return (
    <Modal show={modalShown === 'remove'} onHide={() => dispatch(hideModal())}>
      <Modal.Header>
        <Modal.Title>Remove Channel</Modal.Title>
        <button className="close" type="button" onClick={() => dispatch(hideModal())}>
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
              dispatch(deleteMessagesForChannel({ channelId: currentChannelId }));
              dispatch(removeChannel({ id: currentChannelId }));
              dispatch(selectChannel({ id: defaultChannel }));
              dispatch(hideModal());
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
};

export default ChannelRemoveModal;
