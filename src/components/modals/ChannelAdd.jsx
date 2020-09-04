import React from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import routes from '../../routes';
import cn from 'classnames';

const ChannelAdd = ({ show, closeModal, addChannel }) => {
	return (
		<Modal show={true} onHide={closeModal}>
			<Modal.Header>
				<Modal.Title>Add Channel</Modal.Title>
				<button className="close" type="button" onClick={closeModal}>
					<span aria-hidden="true">×</span>
					<span className="sr-only">Close</span>
				</button>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={{
						channelName: '',
					}}
					onSubmit={async (values, { setFieldError }) => {
						try {
							const response = await axios.post(routes.channelsPath(), {
								data: {
									attributes: {
										name: values.channelName,
									}
								}
							})
							const { name, id, removable } = response.data.data.attributes;
							addChannel({ name, id, removable })
							closeModal();
						} catch (error) {
							setFieldError('channelName', 'Network error');
						}
					}}
					render={({ isSubmitting, isValid }) => (
						<Form>
							<Field
								name='channelName'
								// as={<input className={cn({ 'is-invalid': !isValid })}/>}
								disabled={isSubmitting}
								autoFocus
								autoComplete='off'
							/>
							<button type='submit'>Submit</button>
							<ErrorMessage
								name='channelName'
								component='div'
								className='d-block invalid-feedback'
							/>
						</Form>
					)}
				/>
			</Modal.Body>
		</Modal>
	)
}

export default ChannelAdd;
