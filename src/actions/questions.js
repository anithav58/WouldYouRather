import { saveQuestion } from '../utils/api';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION = 'SAVE_QUESTION';

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
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
