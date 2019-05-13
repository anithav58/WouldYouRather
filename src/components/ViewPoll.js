import React, { Component } from 'react';
import { handleSaveQuestionAnswer } from '../actions/questionAnswer';
import { connect } from 'react-redux';
import Nav from './Nav';

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
		const { user, question, questionAskedBy, dispatch } = this.props;
		dispatch(handleSaveQuestionAnswer(user, question.id, this.state.selectedOption));
	};
	render() {
		const { user, question, questionAskedBy, users } = this.props;
		const answered = !!user.answers[question.id];
		const length = Object.keys(users).length;
		console.log('NEW QUESTION', question);
		return (
			<div>
				<Nav />
				<h3>Results Page</h3>
				{!answered ? (
					<div>
						<h3>{questionAskedBy.name} asks:</h3>
						<div>
							<img src={questionAskedBy.avatarURL} alt="Users avatar " className="avatar" />
							<div>
								<div>Would you Rather:</div>
								<input type="radio" name="option" value="optionOne" onChange={this.handleChange} />
								{question.optionOne.text}

								<input type="radio" name="option" value="optionTwo" onChange={this.handleChange} />
								{question.optionTwo.text}

								<div>
									<button className="btn" onClick={this.handleSubmit}>
										Submit
									</button>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div>
						<h3>Poll Results</h3>
						<span>Asked By {questionAskedBy.name}</span>
						<img src={questionAskedBy.avatarURL} alt="Users avatar " className="avatar" />
						<div>
							<h3>Results</h3>
							<span>{question.optionOne.text}</span>
							<div>
								<h3>
									{question.optionOne.votes.length} out of {length} votes
								</h3>
							</div>
							<span>{question.optionTwo.text}</span>
							<div>
								<h3>
									{question.optionTwo.votes.length} out of {length} votes
								</h3>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

function mapStateToProps({ loggedInUser, users, questions }, props) {
	const { question_id } = props.match.params;

	let user = Object.values(users).find(user => user.id === loggedInUser.id);
	//console.log('USER', user, user.questions);

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
