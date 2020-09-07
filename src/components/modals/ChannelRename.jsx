import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import routes from '../../routes';
import cn from 'classnames';
import { renameChannel } from '../../features/channels/channelsSlice';
import { hideRenameModal } from '../../features/uiState/uiStateSlice';

const mapDispatchToProps = {
	renameChannel,
	hideRenameModal,
}

const ChannelRename = ({ show, channelId, renameChannel, hideRenameModal }) => {
	console.log(channelId)
	return (
		<Modal show={show} onHide={hideRenameModal}>
			<Modal.Header>
				<Modal.Title>Rename Channel</Modal.Title>
				<button className="close" type="button" onClick={hideRenameModal}>
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
							const response = await axios.patch(routes.channelPath(channelId), {
								data: {
									attributes: {
										name: values.channelName,
									}
								}
							})
							console.log(response)
							const { name, id } = response.data.data.attributes;
							renameChannel({ name, id })
							hideRenameModal();
						} catch (error) {
							setFieldError('channelName', 'Network error');
						}
					}}
				>
					{({ isSubmitting, isValid }) => (
						<Form>
							<div className='row justify-content-center'>
								<Field
									name='channelName'
									className={cn('form-control', 'col-9', {
										'is-invalid': !isValid,
									})}
									disabled={isSubmitting}
									validate={value => (!!value ? undefined : 'Required')}
									autoFocus
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
							<ErrorMessage
								name='channelName'
								component='div'
								className='d-block invalid-feedback'
							/>
						</Form>
					)}
				</Formik>
			</Modal.Body>
		</Modal>
	)
}

export default connect(null, mapDispatchToProps)(ChannelRename);
