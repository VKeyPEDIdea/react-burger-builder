import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData,
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	};
};

export const purchaseBurgerFail = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error,
	};
};

export const purchaseBurgerComplete = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_COMPLETED,
	};
};

export const purchaseBurger = (orderData) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		
		axios.post('/orders.json', orderData)
			.then(response => {
				console.log(response.data);
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch(error => {
				dispatch(purchaseBurgerFail(error));
			});
	}
}