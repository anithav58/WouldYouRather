import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/loggedInUser';

class Nav extends Component {
	state = {
		loggedOut: false,
	};
	handleLogout = e => {
		this.props.dispatch(logout());
		this.setState({ loggedOut: true });
	};
	componentDidUpdate() {
		if (!this.props.user) {
			this.setState({ loggedOut: true });
		}
	}
	render() {
		if (this.state.loggedOut) return <Redirect to="/" />;
		const { user } = this.props;

		return (
			<nav className="nav">
				<ul>
					<li>
						<NavLink to="/home" exact activeClassName="active">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/add" exact activeClassName="active">
							New Question
						</NavLink>
					</li>
					<li>
						<NavLink to="/leaderboard" exact activeClassName="active">
							Leader Board
						</NavLink>
					</li>
					<li>
						{/* <div> */}
						{user && (
							<div className="nav-user-wrapper">
								<span>Hello, {user.name}</span>
								<img src={user.avatarURL} alt="User's Avatar" className="nav-user-avatar" />
							</div>
						)}
						{/* </div> */}
					</li>
					<li>
						<button className="logout-btn" onClick={this.handleLogout}>
							Logout
						</button>
						{/* <NavLink to="/" activeClassName="active" onClick={this.handleLogout}>
								  Logout
							  </NavLink> */}
					</li>
				</ul>
			</nav>
		);
	}
}

function mapStateToProps({ users, loggedInUser }) {
	return {
		user: loggedInUser
			? Object.values(users).find(user => {
					return user.id === loggedInUser.id;
			  })
			: null,
	};
}

export default connect(mapStateToProps)(Nav);
