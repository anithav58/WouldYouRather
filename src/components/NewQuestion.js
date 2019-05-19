import React, { Component } from 'react';
import { handleSaveQuestionAsync } from '../actions/questions';

import { connect } from 'react-redux';
import Layout from './Layout';
import { Redirect } from 'react-router-dom';

class NewQuestion extends Component {
	state = {
		optionOneText: '',
		optionTwoText: '',
		toHome: false,
	};
	handleChange = e => {
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
		if (!this.props.loggedInUser) {
			return <Redirect to={{ pathname: '/', state: { redirectUrl: this.props.location.pathname } }} />;
		}
		const { toHome, optionOneText, optionTwoText } = this.state;
		const isEnabled = optionOneText.length > 0 && optionTwoText.length > 0;
		if (toHome === true) {
			return <Redirect to="/home" />;
		}
		return (
			<Layout>
				<div className="tabs">
					<div className="title">Create New Question</div>
					<div className="additional-title">Complete the Question:</div>
					<div className="sub-title">Would you rather...</div>
					<form onSubmit={this.handleSubmit}>
						{/* <div className="new-question-form"> */}

						<input type="text" name="optionOne" placeholder="Option 1" onChange={this.handleChange} />
						<div>---------OR----------</div>
						<input type="text" name="optionTwo" placeholder="Option 2" onChange={this.handleChange} />

						<button className="btn" type="submit" disabled={!isEnabled}>
							SUBMIT
						</button>
					</form>
				</div>
			</Layout>
		);
	}
}
function mapStateToProps({ loggedInUser }) {
	return {
		loggedInUser,
	};
}

export default connect(mapStateToProps)(NewQuestion);
