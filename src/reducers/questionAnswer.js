import { SAVE_QUESTION_ANSWER } from '../actions/questionAnswer';

export default function saveQuestionAnswer(state = {}, action) {
	switch (action.type) {
		case SAVE_QUESTION_ANSWER:
			return {
				...state,
				[action.id]: {
					...state[action.id],
					likes:
						action.hasLiked === true
							? state[action.id].likes.filter(uid => uid !== action.loggedInUser)
							: state[action.id].likes.concat([action.loggedInUser]),
				},
			};
		default:
			return state;
	}
}
