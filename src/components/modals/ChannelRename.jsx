import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import cn from 'classnames';
import routes from '../../routes';
import { renameChannel } from '../../features/channels/channelsSlice';

const validationSchema = Yup.object().shape({
  channelName: Yup.string()
    .required('Required'),
});

const ChannelRename = ({ modalInfo, hideModal }) => {
  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [null]);

  return (
    <Modal show={true} onHide={hideModal}>
      <Modal.Header>
        <Modal.Title>Rename Channel</Modal.Title>
        <button className="close" type="button" onClick={hideModal}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: modalInfo.channel.name,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setFieldError }) => {
            try {
              const response = await axios.patch(routes.channelPath(modalInfo.channel.id), {
                data: {
                  attributes: {
                    name: values.channelName,
                  },
                },
              });
              const { name, id } = response.data.data.attributes;
              dispatch(renameChannel({ name, id }));
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
                  innerRef={inputRef}
                />
                <button
                  type='submit'
                  className='btn btn-primary ml-2'
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
              {errors.channelName ? (
                <div className='d-block invalid-feedback'>{errors.channelName}</div>
              ) : null}
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ChannelRename;
