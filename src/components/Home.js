import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabs from './Tabs';
import '../styles/styles.css';
import UserQuestion from './UserQuestion';
import Nav from './Nav';
import { Redirect } from 'react-router-dom';

class Home extends Component {
	render() {
		if (!this.props.loggedInUser) {
			return <Redirect to="/not-found" />;
		}
		const { unansweredQuestions, answeredQuestions } = this.props.allQuestions;

		return (
			<div>
				<Nav />

				<div className="container">
					<Tabs>
						<div label="Unanswered">
							{unansweredQuestions.map(question => {
								return <UserQuestion key={question.id} question={question} />;
							})}
						</div>
						<div label="Answered">
							{answeredQuestions.map(question => {
								return <UserQuestion key={question.id} question={question} />;
							})}
						</div>
					</Tabs>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ loggedInUser, questions }) {
	const listOfQuestions = Object.values(questions);

	return {
		allQuestions: listOfQuestions.reduce(
			(acc, question) => {
				let allVotes = [...question.optionOne.votes, ...question.optionTwo.votes];
				if (allVotes.includes(loggedInUser.id)) {
					acc.answeredQuestions = [...acc.answeredQuestions, question];
				} else {
					acc.unansweredQuestions = [...acc.unansweredQuestions, question];
				}
				return acc;
			},
			{
				answeredQuestions: [],
				unansweredQuestions: [],
			}
		),
		loggedInUser: loggedInUser,
	};
}
export default connect(mapStateToProps)(Home);
