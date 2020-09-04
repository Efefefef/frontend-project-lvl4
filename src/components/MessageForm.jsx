import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import axios from 'axios';
import { useFormik } from 'formik';
import routes from '../routes';

const validate = values => {
	const errors = {};
	if (!values.newMessage) {
		errors.newMessage = 'Required';
	}
	return errors;
}

const MessageForm = ({ currentChannelId, name }) => {
	const formik = useFormik({
		initialValues: {
			newMessage: '',
		},
		validate,
		onSubmit: async (values, { setFieldError, resetForm }) => {
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
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className='form-group'>
				<div className='input-group'>
					<input
						className={cn('form-control', { 'is-invalid': !formik.isValid })}
						value={formik.values.newMessage}
						id='newMessage'
						name='newMessage'
						onChange={formik.handleChange}
						disabled={formik.isSubmitting}
						autoFocus
						autoComplete='off'
					/>
					<div className='d-block invalid-feedback'>
						{formik.errors.newMessage}
					</div>
				</div>
			</div>
		</form>
	)
}

export default connect(null)(MessageForm);
