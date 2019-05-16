import { saveQuestion } from '../utils/api';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS';

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	};
}
export function updateQuestions(loggedInUser, qid, answer) {
	return {
		type: UPDATE_QUESTIONS,
		loggedInUser,
		qid,
		answer,
	};
}

function handleSaveQuestion(question) {
	return {
		type: SAVE_QUESTION,
		question,
	};
}

export function handleSaveQuestionAsync(question) {
	return dispatch => {
		return saveQuestion(question).then(question => {
			return dispatch(handleSaveQuestion(question));
		});
	};
}
