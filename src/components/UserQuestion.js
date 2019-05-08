import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserQuestion extends Component {
	render() {
		const { question, user } = this.props;
		console.log('props', this.props);
		const { id, name, avatarURL } = user;
		return (
			<div className="user-question-card">
				<h3>{user.name}</h3>
				<div>
					<img src={avatarURL} alt="Author's avatar" className="avatar" />
					<div>
						<h4>Would you rather?</h4>
						<span>..{question.optionOne.text}..</span>
						<button className="btn">View Poll</button>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ users, questions, loggedInUser }, { question }) {
	return {
		questions,
		user: Object.values(users).find(user => {
			return user.id == question.author;
		}),
	};
}

export default connect(mapStateToProps)(UserQuestion);
