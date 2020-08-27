import React from 'react';
import cn from 'classnames';
import axios from 'axios';
import routes from '../routes';
import {Consumer} from '../context';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		const {currentChannelId} = this.props;
		this.state = {
			newMessage: '',
			currentChannelId
		}
		console.log(this.state)
	}

	handleSubmit = (name) => async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(routes.channelMessagesPath(1), {
				data: {
					attributes: {
						body: this.state.newMessage,
						channelId: this.state.currentChannelId,
						nickname: name,
					}
				}
			})
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}

	handleInputChange = (e) => {
		this.setState({newMessage: e.target.value});
	}

	render() {
		const {channels, messages} = this.props;
		return (
			<Consumer>
				{name => (
					<div className='row h-100 pb-3'>
						<div className='col-3 border-right'>
							<div className='d-flex mb-2'>
								<span>Channels</span>
								<button className='btn btn-link p-0 ml-auto'>+</button>
							</div>
							<ul className='nav flex-column nav-pills nav-fill'>
								{channels.map(channel => (
									<li key={channel.name} className='nav-item'>
										<button type='button' className={cn('nav-link', 'btn', 'btn-block',
											{'active': this.state.currentChannelId === channel.id}
										)}>
											{channel.name}
										</button>
									</li>
								))}
							</ul>
						</div>
						<div className='col h-100'>
							<div className='d-flex flex-column h-100'>
								<div id='message-box' className='chat-messages overflow-auto mb-3'>
									{messages.map(JSON.stringify).join('\n')},
								</div>
								<div className='mt-auto'>
									<form noValidate onSubmit={this.handleSubmit(name)}>
										<div className='form-group'>
											<div className='input-group'>
												<input name='body' className='form-control' value={this.state.newMessage}
												       onChange={this.handleInputChange}/>
												<div className='d-block invalid-feedback'>

												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				)}
			</Consumer>
		);
	}
}
