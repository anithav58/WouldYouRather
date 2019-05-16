import { combineReducers } from 'redux';

import users from '../reducers/users';
import loggedInUser from '../reducers/loggedInUser';
import questions from '../reducers/questions';

import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
	users,
	loggedInUser,
	questions,
	loadingBar: loadingBarReducer,
});
