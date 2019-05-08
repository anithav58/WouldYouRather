import React, { Component } from 'react';

class NewQuestion extends Component() {
	render() {
		return (
			<div>
				<h3>Create New Question</h3>
				<form onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Option 1" />
					<p>or</p>
					<input type="text" placeholder="Option 2" />

					<button className="btn" type="submit">
						SUBMIT
					</button>
				</form>
			</div>
		);
	}
}

export default NewQuestion;
