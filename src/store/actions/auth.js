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
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('localId');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

const checkAuthTimeout = (expirationTime) => {
	console.log(expirationTime);
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime);
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
				const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('localId', response.data.localId );
				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTimeout(+response.data.expiresIn * 1000));
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

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate > new Date()) {
				const userId = localStorage.getItem('localId');
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
			}
		}
	}
}