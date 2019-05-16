import { RECEIVE_QUESTIONS, SAVE_QUESTION, UPDATE_QUESTIONS } from '../actions/questions';

export default function questions(state = {}, action) {
	switch (action.type) {
		case RECEIVE_QUESTIONS:
			return {
				...state,
				...action.questions,
			};
		case SAVE_QUESTION:
			return {
				...state,
				[action.question.id]: action.question,
			};
		case UPDATE_QUESTIONS:
			return {
				...state,
				[action.qid]: {
					...state[action.qid],
					[action.answer]: {
						...state[action.qid][action.answer],
						votes: state[action.qid][action.answer].votes.concat([action.loggedInUser]),
					},
				},
			};
		default:
			return state;
	}
}
