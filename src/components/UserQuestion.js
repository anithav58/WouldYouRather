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
				<h3>{user.name}</h3>
				<div>
					<img src={avatarURL} alt="Author's avatar" className="avatar" />
					<div>
						<h4>Would you rather?</h4>
						<span>..{question.optionOne.text}..</span>
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
