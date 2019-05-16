import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeaderBoardCard from './LeaderBoardCard';
import Nav from './Nav';
import { Redirect } from 'react-router-dom';

class LeaderBoard extends Component {
	render() {
		if (!this.props.loggedInUser) {
			return <Redirect to="/not-found" />;
		}
		const { listOfUsers } = this.props;

		const users = listOfUsers.sort((a, b) => b.score - a.score);

		return (
			<div>
				<Nav />
				<h3>Welcome to Leaderboard !</h3>
				<div>
					{users.map(user => {
						return <LeaderBoardCard key={user.id} user={user} />;
					})}
				</div>
			</div>
		);
	}
}

function mapStateToProps({ users, questions, loggedInUser }) {
	return {
		listOfUsers: Object.values(users).map(user => {
			let answers = Object.values(user.answers);
			let answeredQs = answers.length;
			let createdQs = Object.values(questions).filter(question => {
				return question.author === user.id;
			}).length;
			let score = answeredQs + createdQs;
			return {
				...user,
				answeredQs,
				createdQs,
				score,
			};
		}),
		loggedInUser,
	};
}

export default connect(mapStateToProps)(LeaderBoard);
