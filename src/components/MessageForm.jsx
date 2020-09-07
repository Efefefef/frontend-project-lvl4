import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import routes from '../routes';

const MessageForm = ({ currentChannelId, name }) => {
	return (
		<Formik
			initialValues={{
				newMessage: '',
			}}
			onSubmit={async (values, { setFieldError, resetForm }) => {
				if (!values.newMessage) {
					setFieldError('newMessage', 'Required');
					return;
				}
				try {
					await axios.post(routes.channelMessagesPath(currentChannelId), {
						data: {
							attributes: {
								body: values.newMessage,
								channelId: currentChannelId,
								nickname: name,
							}
						}
					})
					resetForm();
				} catch (error) {
					setFieldError('newMessage', 'Network error');
				}
			}}
		>
			{({ isSubmitting, isValid }) => (
				<Form>
					<Field
						name='newMessage'
						className={cn('form-control', {
							'is-invalid': !isValid,
						})}
						disabled={isSubmitting}
						// validate={value => (!!value ? undefined : 'Required')}
						autoFocus
						autoComplete='off'
					/>
					<ErrorMessage
						name='newMessage'
						component='div'
						className='d-block invalid-feedback'
					/>
				</Form>
			)}
		</Formik>
	)
}

export default connect(null)(MessageForm);
