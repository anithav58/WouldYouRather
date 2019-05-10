import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeaderBoardCard from './LeaderBoardCard';

class LeaderBoard extends Component {
	render() {
		const { listOfUsers } = this.props;
		console.log('listOfUsers', listOfUsers);
		const users = listOfUsers.sort((a, b) => b.score - a.score);
		console.log('users', users);
		return (
			<div>
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

function mapStateToProps({ users, questions }) {
	return {
		listOfUsers: Object.values(users).map(user => {
			let answers = Object.values(user.answers);
			let answeredQs = answers.length;
			let createdQs = Object.values(questions).filter(question => {
				return question.author == user.id;
			}).length;
			let score = answeredQs + createdQs;
			return {
				...user,
				answeredQs,
				createdQs,
				score,
			};
		}),
	};
}

export default connect(mapStateToProps)(LeaderBoard);
