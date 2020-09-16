import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Formik, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import routes from '../../routes';
import { removeChannel, selectChannel } from '../../features/channels/channelsSlice';

const defaultChannel = 1;

const ChannelRemove = ({ modalInfo, hideModal }) => {
  const dispatch = useDispatch();

  return (
    <Modal show={true} onHide={hideModal}>
      <Modal.Header>
        <Modal.Title>Remove Channel</Modal.Title>
        <button className="close" type="button" onClick={hideModal}>
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
              await axios.delete(routes.channelPath(modalInfo.channel.id));
              dispatch(removeChannel({ id: modalInfo.channel.id }));
              dispatch(selectChannel({ id: defaultChannel }));
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
};

export default ChannelRemove;
