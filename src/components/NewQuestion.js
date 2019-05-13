import React, { Component } from 'react';
import { handleSaveQuestionAsync } from '../actions/questions';

import { connect } from 'react-redux';
import Nav from './Nav';
import { Redirect } from 'react-router-dom';

class NewQuestion extends Component {
	state = {
		optionOneText: '',
		optionTwoText: '',
		toHome: false,
	};
	handleChange = e => {
		//debugger;
		const text = e.target.value;
		if (e.target.name === 'optionOne') {
			this.setState(() => ({ optionOneText: text }));
		} else if (e.target.name === 'optionTwo') {
			this.setState(() => ({ optionTwoText: text }));
		}
	};
	handleSubmit = e => {
		e.preventDefault();

		const { dispatch, loggedInUser } = this.props;
		const { optionOneText, optionTwoText } = this.state;

		dispatch(handleSaveQuestionAsync({ optionOneText, optionTwoText, author: loggedInUser.id }));
		this.setState(() => ({
			optionOneText: '',
			optionTwoText: '',
			toHome: true,
		}));
	};
	render() {
		const { toHome } = this.state;
		if (toHome === true) {
			return <Redirect to="/home" />;
		}
		return (
			<div>
				<Nav />
				<h2>Create New Question</h2>
				<h4>Complete the Question:</h4>
				<h3>Would you rather...</h3>
				<form onSubmit={this.handleSubmit}>
					<div>
						<input type="text" name="optionOne" placeholder="Option 1" onChange={this.handleChange} />
						<span>or</span>
						<input type="text" name="optionTwo" placeholder="Option 2" onChange={this.handleChange} />
					</div>
					<button className="btn" type="submit">
						SUBMIT
					</button>
				</form>
			</div>
		);
	}
}
function mapStateToProps({ loggedInUser }) {
	return {
		loggedInUser,
	};
}

export default connect(mapStateToProps)(NewQuestion);
