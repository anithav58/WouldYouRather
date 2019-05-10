import React, { Component } from 'react';
import '../styles/App.css';
import Login from './Login';
import { connect } from 'react-redux';
import Home from './Home';
import LeaderBoard from './LeaderBoard';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ViewPoll from './ViewPoll';

import { handleInitialData } from '../actions/shared';

class App extends Component {
	componentDidMount() {
		this.props.handleInitialData();
	}
	render() {
		return (
			<Router>
				<div className="App">
					<Route path="/" exact component={Login} />
					<Route path="/home" component={Home} />
					<Route path="/leaderboard" component={LeaderBoard} />
					<Route path="/questions/:question_id" component={ViewPoll} />
				</div>
			</Router>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

const mapDispatchToProps = dispatch => {
	return {
		//login: id => dispatch(setLoggedInUser({ id })),
		handleInitialData: () => dispatch(handleInitialData()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
