import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeaderBoardCard extends Component {
	render() {
		const { user } = this.props;
		console.log('user:', user);
		return (
			<div>
				<img src={user.avatarURL} alt="User's Avatar" className="avatar" />
				<div>
					<span>{user.name}</span>
					<h3>
						Answered Questions: <span>{user.answeredQs}</span>
					</h3>
					<h3>
						Created Questions: <span>{user.createdQs}</span>
					</h3>
				</div>
				<div>
					<span>Score: {user.score}</span>
				</div>
			</div>
		);
	}
}

export default LeaderBoardCard;
