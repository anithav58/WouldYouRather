import { SET_LOGGEDIN_USER, LOGOUT_USER } from '../actions/loggedInUser';

export default function loggedInUser(state = null, action) {
	switch (action.type) {
		case SET_LOGGEDIN_USER:
			return {
				...state,
				...action.id,
			};
		case LOGOUT_USER:
			return {
				...state,
				id: null,
			};

		default:
			return state;
	}
}
