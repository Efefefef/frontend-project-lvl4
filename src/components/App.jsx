import React from 'react';

export default class App extends React.Component {
	render() {
		const { channels } = this.props;
		return (
			<div>
				{channels.map(channel => <div key={channel.name}>{channel.name}</div>)}
			</div>
		)
	}
}
