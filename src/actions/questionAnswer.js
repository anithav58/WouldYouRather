import { handleInitialData } from '../actions/shared';
import { saveQuestionAnswer } from '../utils/api';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
function questionAnswer(authedUser, qid, answer) {
	return {
		type: SAVE_QUESTION_ANSWER,
		authedUser,
		qid,
		answer,
	};
}
export function handleSaveQuestionAnswer(authedUser, qid, answer) {
	return (dispatch, getState) => {
		return saveQuestionAnswer({ authedUser: authedUser.id, qid, answer }).then(() => {
			dispatch(handleInitialData());
		});
	};
}
