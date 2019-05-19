import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabs from './Tabs';
// import '../styles/styles.css';
import UserQuestion from './UserQuestion';
import Layout from './Layout';
import { Redirect } from 'react-router-dom';

class Home extends Component {
	render() {
		if (!this.props.loggedInUser) {
			return <Redirect to={{ pathname: '/', state: { redirectUrl: this.props.location.pathname } }} />;
		}
		const { unansweredQuestions, answeredQuestions } = this.props.allQuestions;

		return (
			<Layout>
				{/* <div className="container"> */}
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
				{/* </div> */}
			</Layout>
		);
	}
}

function mapStateToProps({ loggedInUser, questions }) {
	const listOfQuestions = Object.values(questions).sort((a, b) => b.timestamp - a.timestamp);

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
