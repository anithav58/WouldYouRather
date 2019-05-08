import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabs from './Tabs';
import '../styles/styles.css';
import UserQuestion from './UserQuestion';
import Nav from './Nav';

class Home extends Component {
	render() {
		console.log('allquestions', this.props.allQuestions);
		const { unansweredQuestions, answeredQuestions } = this.props.allQuestions;

		return (
			<div>
				<Nav />
				<div>
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

function mapStateToProps({ loggedInUser, users, questions }) {
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
	};
}
export default connect(mapStateToProps)(Home);
