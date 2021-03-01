import * as actionTypes from './actionTypes';
import axios from 'axios';

const API_KEY = 'AIzaSyB8VeVp0GCq3yJIu6jI_OTSxF0QfJsz4LM';
const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';

const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

const authSuccess = (idToken, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken,
		userId,
	};
};

const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error,
	};
};

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

const checkAuthTimeout = (expirationTime) => {
	console.log(expirationTime);
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password, method) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email,
			password,
			returnSecureToken: true,
		};
		console.log(authData);
		
		let authMethod = null;
		switch (method) {
			case 'signUp':
				authMethod = 'signUp';
				break;
			case 'signIn':
				authMethod = 'signInWithPassword';
				break;
			default:
				break;
		}

		const requestUrl = baseUrl + authMethod + '?key=' + API_KEY;

		axios.post(requestUrl, authData)
			.then(response => {
				console.log(response);
				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTimeout(+response.data.expiresIn));
			})
			.catch(error => {
				console.log(error);
				dispatch(authFail(error));
			});
	};
};

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path,
	};
};