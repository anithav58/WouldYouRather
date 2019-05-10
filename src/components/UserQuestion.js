import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserQuestion extends Component {
	render() {
		const { question, user, answered } = this.props;
		//console.log('props', this.props);
		const { id, name, avatarURL } = user;
		const questionId = question.id;
		return (
			<div className="user-question-card">
				<h3>{user.name}</h3>
				<div>
					<img src={avatarURL} alt="Author's avatar" className="avatar" />
					<div>
						<h4>Would you rather?</h4>
						<span>..{question.optionOne.text}..</span>
						{
							<Link to={`questions/${question.id}`}>
								<button className="btn">View Poll</button>
							</Link>
						}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ users, questions, loggedInUser }, { question, answered }) {
	return {
		questions,
		user: Object.values(users).find(user => {
			return user.id === question.author;
		}),
		answered,
	};
}

export default connect(mapStateToProps)(UserQuestion);
