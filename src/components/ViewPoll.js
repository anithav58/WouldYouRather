import React, { Component } from 'react';
import { handleSaveQuestionAnswer } from '../actions/questionAnswer';
import { connect } from 'react-redux';
import Layout from './Layout';
import { Redirect } from 'react-router-dom';
import vote from '../images/vote.jpeg';

function getVotesPercentage(option, totalVotes) {
	return totalVotes > 0 ? Math.round((option * 100) / totalVotes) : 0;
}

class ViewPoll extends Component {
	state = {
		selectedOption: 'optionOne',
	};

	handleChange = e => {
		console.log('selected option', e.currentTarget.value);
		const text = e.currentTarget.value;
		this.setState(() => ({
			selectedOption: text,
		}));
	};
	handleSubmit = e => {
		e.preventDefault();
		const { user, question, dispatch } = this.props;
		dispatch(handleSaveQuestionAnswer(user.id, question.id, this.state.selectedOption));
	};
	render() {
		const { user, question, questionAskedBy } = this.props;
		if (user === undefined) {
			return <Redirect to="/not-found" />;
		}
		const answered = !!user.answers[question.id];
		const optionOneVotesLength = answered ? question.optionOne.votes.length : 0;
		const optionTwoVotesLength = answered ? question.optionTwo.votes.length : 0;
		const totalVotes = optionOneVotesLength + optionTwoVotesLength;
		const optionOnePercent = getVotesPercentage(optionOneVotesLength, totalVotes);
		const optionTwoPercent = getVotesPercentage(optionTwoVotesLength, totalVotes);
		const isEnabled = this.state.selectedOption.length > 0;

		return (
			<Layout>
				{!answered ? (
					<div className="poll-result">
						<h4>Asked by {questionAskedBy.name} </h4>
						<div className="user-question-card-content">
							<div className="user-question-card-img">
								<img src={questionAskedBy.avatarURL} alt="Users avatar " className="avatar" />
							</div>
							<div className="user-question-card-question results">
								<h4>Would you Rather..</h4>
								<div className="radio-button">
									<input type="radio" name="option" value="optionOne" onChange={this.handleChange} />
									<label>{question.optionOne.text}</label>
								</div>
								<div className="radio-button">
									<input type="radio" name="option" value="optionTwo" onChange={this.handleChange} />
									<label>{question.optionTwo.text}</label>
								</div>
								<div>
									<button className="btn" onClick={this.handleSubmit} disabled={!isEnabled}>
										Submit
									</button>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="tabs ">
						<h4>Asked By {questionAskedBy.name}</h4>
						<div className="user-question-card-content">
							<div className="user-question-card-img">
								<img src={questionAskedBy.avatarURL} alt="Users avatar " className="avatar" />
							</div>
							<div>
								<div className="caption">Results:</div>
								<div className="view-poll-result">
									<div className="result-card">
										{optionOneVotesLength > 0 && (
											<div className="vote-wrapper">
												<img src={vote} alt="user's vote " className="vote" />
											</div>
										)}
										<div className="sub-title">Would you rather {question.optionOne.text}</div>
										<div className="result-progress">
											<div
												className="result-filled"
												style={{
													width: `${optionOnePercent}%`,
												}}
											>
												<div className="result-percentage">{optionOnePercent}%</div>
											</div>
										</div>
										<div>
											<h3>
												{optionOneVotesLength} out of {totalVotes} votes
											</h3>
										</div>
									</div>
									<div className="result-card">
										{optionTwoVotesLength > 0 && (
											<div className="vote-wrapper">
												<img src={vote} alt="user's vote" className="vote" />
											</div>
										)}
										<div className="sub-title">Would you rather {question.optionTwo.text}</div>
										<div className="result-progress">
											<div
												className="result-filled"
												style={{
													width: `${optionTwoPercent}%`,
												}}
											>
												<div className="result-percentage">{optionTwoPercent}%</div>
											</div>
										</div>
										<div>
											<h3>
												{optionTwoVotesLength} out of {totalVotes} votes
											</h3>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</Layout>
		);
	}
}

function mapStateToProps({ loggedInUser, users, questions }, props) {
	const { question_id } = props.match.params;

	let user = Object.values(users).find(user => user.id === loggedInUser.id);

	let question = Object.values(questions).find(question => question.id === question_id);
	let questionAskedBy = Object.values(users).find(user => user.id === question.author);
	return {
		user,
		question,
		questionAskedBy,
		users,
	};
}

export default connect(mapStateToProps)(ViewPoll);
