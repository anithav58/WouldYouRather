export const SET_LOGGEDIN_USER = 'SET_LOGGEDIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export function setLoggedInUser(id) {
	return {
		type: SET_LOGGEDIN_USER,
		id,
	};
}
export function logout() {
	return {
		type: LOGOUT_USER,
	};
}
