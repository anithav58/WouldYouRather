import { saveQuestionAnswer } from '../utils/api';
import { updateUsers } from './users';
import { updateQuestions } from './questions';
import { showLoading, hideLoading } from 'react-redux-loading';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

export function handleSaveQuestionAnswer(loggedUser, qid, answer) {
	return dispatch => {
		return saveQuestionAnswer({ authedUser: loggedUser, qid, answer }).then(() => {
			dispatch(showLoading());
			dispatch(updateUsers(loggedUser, qid, answer));
			dispatch(updateQuestions(loggedUser, qid, answer));
			dispatch(hideLoading());
		});
	};
}
