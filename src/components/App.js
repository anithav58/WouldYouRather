import React, { Component, Fragment } from 'react';
// import '../styles/App.css';
import Login from './Login';
import { connect } from 'react-redux';
import Home from './Home';
import LeaderBoard from './LeaderBoard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ViewPoll from './ViewPoll';
import LoadingBar from 'react-redux-loading';
import { handleInitialData } from '../actions/shared';
import NewQuestion from './NewQuestion';
import NotFound from './NotFound';

class App extends Component {
	componentDidMount() {
		this.props.handleInitialData();
	}
	render() {
		return (
			<Router>
				<Fragment>
					<LoadingBar />
					<div className="App">
						{this.props.loading === true ? null : (
							<div>
								<Switch>
									<Route path="/" exact component={Login} />
									<Route path="/home" exact component={Home} />
									<Route path="/leaderboard" exact component={LeaderBoard} />
									<Route path="/questions/:question_id" exact component={ViewPoll} />
									<Route path="/add" exact component={NewQuestion} />
									<Route component={NotFound} />
								</Switch>
							</div>
						)}
					</div>
				</Fragment>
			</Router>
		);
	}
}

function mapStateToProps({ users }) {
	return {
		loading: users === null,
	};
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
