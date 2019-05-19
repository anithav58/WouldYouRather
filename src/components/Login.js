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
			let { redirectUrl } = this.props.location.state ? this.props.location.state : { redirectUrl: '/home' };
			return <Redirect to={redirectUrl} />;
		}
		const { users } = this.props;
		const userKeys = Object.values(users);
		return (
			<div className="login-page">
				<div className="caption">Welcome to Would you Rather App</div>
				<div className="app-logo">
					<img src={logo} alt="App Logo" />
				</div>
				<div className="center">Sign In</div>
				<div>
					<select value={this.state.selected} onChange={this.handleChange}>
						<option value="" key="Select" />
						{userKeys.map(user => (
							<option key={user.id} value={user.id}>
								{user.name}
							</option>
						))}
					</select>
				</div>
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
