import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserQuestion extends Component {
	state = {
		error: false,
	};
	componentDidMount() {
		if (!this.props.question) {
			this.setState({ error: true });
		}
	}
	render() {
		if (this.state.error) {
			return <h1>Not foubd </h1>;
		}
		const { question, user } = this.props;
		//console.log('props', this.props);
		const { avatarURL } = user;

		return (
			<div className="user-question-card">
				<h4>{user.name} asks:</h4>
				<div className="user-question-card-content">
					<div className="user-question-card-img">
						<img src={avatarURL} alt="Author's avatar" className="avatar" />
					</div>
					<div className="user-question-card-question">
						<h5>Would you rather?</h5>
						<div>..{question.optionOne.text}..</div>
						{
							<Link to={`questions/${question.id}`}>
								<button className="btn">View Poll</button>
							</Link>
						}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ users, questions }, { question }) {
	return {
		questions,
		user: Object.values(users).find(user => {
			return user.id === question.author;
		}),
	};
}

export default connect(mapStateToProps)(UserQuestion);
