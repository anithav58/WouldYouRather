import React, { Component } from 'react';

class NewQuestion extends Component {
	handleSubmit = e => {
		e.preventDefault();
		//TODO: SAVE THE NEW QUESTION
	};
	render() {
		return (
			<div>
				<h2>Create New Question</h2>
				<h4>Complete the Question:</h4>
				<h3>Would you rather...</h3>
				<form onSubmit={this.handleSubmit}>
					<div>
						<input type="text" placeholder="Option 1" />
						<span>or</span>
						<input type="text" placeholder="Option 2" />
					</div>
					<button className="btn" type="submit">
						SUBMIT
					</button>
				</form>
			</div>
		);
	}
}

export default NewQuestion;
