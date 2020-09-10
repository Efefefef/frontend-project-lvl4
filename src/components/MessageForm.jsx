import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import axios from 'axios';
import {
  Formik, Field, Form,
} from 'formik';
import * as Yup from 'yup';
import routes from '../routes';

const validationSchema = Yup.object().shape({
  newMessage: Yup.string()
    .required('Required'),
});

const MessageForm = ({ currentChannelId, name }) => (
  <Formik
    initialValues={{
      newMessage: '',
    }}
    validationSchema={validationSchema}
    onSubmit={async (values, { setFieldError, resetForm }) => {
      try {
        await axios.post(routes.channelMessagesPath(currentChannelId), {
          data: {
            attributes: {
              body: values.newMessage,
              channelId: currentChannelId,
              nickname: name,
            },
          },
        });
        resetForm();
      } catch (error) {
        setFieldError('newMessage', 'Network error');
      }
    }}
  >
    {({
      isSubmitting, isValid, errors,
    }) => (
      <Form>
        <Field
          name='newMessage'
          className={cn('form-control', {
            'is-invalid': !isValid,
          })}
          disabled={isSubmitting}
          autoComplete='off'
        />
        { errors.newMessage ? (
          <div className='d-block invalid-feedback'>{errors.newMessage}</div>
        ) : null}
      </Form>
    )}
  </Formik>
);

export default connect(null)(MessageForm);
