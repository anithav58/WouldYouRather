import { handleInitialData } from '../actions/shared';
import { saveQuestionAnswer } from '../utils/api';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
function questionAnswer(loggedInUser, qid, answer) {
	return {
		type: SAVE_QUESTION_ANSWER,
		loggedInUser,
		qid,
		answer,
	};
}
export function handleSaveQuestionAnswer(loggedInUser, qid, answer) {
	return dispatch => {
		dispatch(questionAnswer(loggedInUser, qid, answer));
		return saveQuestionAnswer({ loggedInUser, qid, answer }).then(() => handleInitialData());
	};
}
