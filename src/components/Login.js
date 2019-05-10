import React, { Component } from 'react';
import logo from '../images/logo.jpeg';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import { setLoggedInUser } from '../actions/loggedInUser';
import { Redirect } from 'react-router-dom';

class Login extends Component {
	state = {
		isLoggedIn: false,
	};
	// componentDidMount() {
	// 	this.props.handleInitialData();
	// }

	handleChange = e => {
		e.preventDefault();
		this.props.login(e.target.value);
		this.setState({
			isLoggedIn: true,
		});
	};
	render() {
		const { isLoggedIn } = this.state;
		if (isLoggedIn === true) {
			return <Redirect to="/home" />;
		}
		const { users } = this.props;
		const userKeys = Object.values(users);

		console.log('USERS', users);
		return (
			<div>
				<h3>Welcome to Would you Rather App</h3>
				<img src={logo} alt="App Logo" />
				<h4 className="center">Sign In</h4>
				<select value={this.state.selected} onChange={this.handleChange}>
					<option value="" key="Select" />
					{userKeys.map(user => (
						<option key={user.id} value={user.id}>
							{user.name}
						</option>
					))}
				</select>
			</div>
		);
	}
}
function mapStateToProps({ users }) {
	return { users };
}

const mapDispatchToProps = dispatch => {
	return {
		login: id => dispatch(setLoggedInUser({ id })),
		handleInitialData: () => dispatch(handleInitialData()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
