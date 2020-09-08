import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import axios from 'axios';
import cn from 'classnames';
import routes from '../../routes';
import { renameChannel } from '../../features/channels/channelsSlice';
import { hideModal } from '../../features/uiState/uiStateSlice';

const mapStateToProps = (state) => {
  const { uiState: { modalShown }, channelsInfo: { channels, currentChannelId } } = state;
  const currentChannelName = channels.find((channel) => channel.id === currentChannelId).name;
  return {
    modalShown,
    currentChannelId,
    currentChannelName,
  };
};

const mapDispatchToProps = {
  renameChannel,
  hideModal,
};

const ChannelRenameModal = ({
  modalShown, renameChannel, hideModal, currentChannelName, currentChannelId,
}) => (
		<Modal show={modalShown === 'rename'} onHide={hideModal}>
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
					  channelName: currentChannelName,
					}}
					onSubmit={async (values, { setFieldError }) => {
					  try {
					    const response = await axios.patch(routes.channelPath(currentChannelId), {
					      data: {
					        attributes: {
					          name: values.channelName,
					        },
					      },
					    });
					    const { name, id } = response.data.data.attributes;
					    renameChannel({ name, id });
					    hideModal();
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
									validate={(value) => (value ? undefined : 'Required')}
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
);

export default connect(mapStateToProps, mapDispatchToProps)(ChannelRenameModal);
