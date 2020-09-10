import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import {
  Formik, Field, Form,
} from 'formik';
import axios from 'axios';
import cn from 'classnames';
import * as Yup from 'yup';
import routes from '../../routes';
import { addChannel, selectChannel } from '../../features/channels/channelsSlice';
import { hideModal } from '../../features/uiState/uiStateSlice';

const mapStateToProps = (state) => {
  const { uiState: { modalShown } } = state;
  return {
    modalShown,
  };
};

const mapDispatchToProps = {
  addChannel,
  hideModal,
  selectChannel,
};

const validationSchema = Yup.object().shape({
  channelName: Yup.string()
    .required('Required'),
});

const ChannelAddModal = ({
  modalShown, addChannel, hideModal, selectChannel,
}) => (
  <Modal show={modalShown === 'add'} onHide={hideModal}>
    <Modal.Header>
      <Modal.Title>Add Channel</Modal.Title>
      <button className="close" type="button" onClick={hideModal}>
        <span aria-hidden="true">×</span>
        <span className="sr-only">Close</span>
      </button>
    </Modal.Header>
    <Modal.Body>
      <Formik
        initialValues={{
          channelName: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setFieldError }) => {
          try {
            const response = await axios.post(routes.channelsPath(), {
              data: {
                attributes: {
                  name: values.channelName,
                },
              },
            });
            const { name, id, removable } = response.data.data.attributes;
            addChannel({ name, id, removable });
            selectChannel({ id });
            hideModal();
          } catch (error) {
            setFieldError('channelName', 'Network error');
          }
        }}
      >
        {({ isSubmitting, isValid, errors }) => (
          <Form>
            <div className='row justify-content-center'>
              <Field
                name='channelName'
                className={cn('form-control', 'col-9', {
                  'is-invalid': !isValid,
                })}
                disabled={isSubmitting}
                autoComplete='off'
              />
              <button
                type='submit'
                className='btn btn-primary ml-2'
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
            { errors.channelName ? (
              <div className='d-block invalid-feedback'>{errors.channelName}</div>
            ) : null}
          </Form>
        )}
      </Formik>
    </Modal.Body>
  </Modal>
);

export default connect(mapStateToProps, mapDispatchToProps)(ChannelAddModal);
