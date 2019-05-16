import { RECEIVE_USERS, UPDATE_USERS } from '../actions/users';

export default function users(state = {}, action) {
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.users,
			};
		case UPDATE_USERS:
			return {
				...state,
				[action.loggedInUser]: {
					...state[action.loggedInUser],
					answers: {
						...state[action.loggedInUser].answers,
						[action.qid]: action.answer,
					},
				},
			};
		default:
			return state;
	}
}
