import React, { Component } from 'react';
import { handleSaveQuestionAnswer } from '../actions/questionAnswer';
import { connect } from 'react-redux';

class ViewPoll extends Component {
	state = {
		selectedOption: 'optionOne',
	};
	handleChange = e => {
		debugger;
		console.log('selected option', e.currentTarget.value);
		const text = e.currentTarget.value;
		this.setState(() => ({
			selectedOption: text,
		}));
	};
	handleSubmit = e => {
		e.preventDefault();
		const { user, question, questionAskedBy } = this.props;
		debugger;
		handleSaveQuestionAnswer({
			qid: question.id,
			loggedInUser: user.id,
			answer: this.state.selectedOption,
		});
	};
	render() {
		const { user, question, questionAskedBy } = this.props;
		const answered = user.questions.includes(question.id);

		return (
			<div>
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
								{question.optionOne.text}

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
							<span>{question.optionOne.text}</span>
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
	};
}

export default connect(mapStateToProps)(ViewPoll);
