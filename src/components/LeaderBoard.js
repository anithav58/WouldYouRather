import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeaderBoardCard from './LeaderBoardCard';
import Layout from './Layout';
import { Redirect } from 'react-router-dom';
import goldcup from '../images/goldcup.png';
import silvercup from '../images/silvercup.jpeg';
import bronzecup from '../images/bronzecup.jpeg';

class LeaderBoard extends Component {
	render() {
		if (!this.props.loggedInUser) {
			return <Redirect to="/not-found" />;
		}
		const { listOfUsers } = this.props;

		const users = listOfUsers.sort((a, b) => b.score - a.score);

		return (
			<Layout>
				<div className="leaderboard">
					{users.map((user, index) => {
						let imgCup = undefined;
						if (index === 0) imgCup = goldcup;
						if (index === 1) imgCup = silvercup;
						if (index === 2) imgCup = bronzecup;

						return <LeaderBoardCard key={user.id} user={user} imgCup={imgCup} />;
					})}
				</div>
			</Layout>
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
