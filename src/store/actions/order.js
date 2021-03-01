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

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		
		axios.post('/orders.json?auth=' + token, orderData)
			.then(response => {
				console.log(response.data);
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch(error => {
				dispatch(purchaseBurgerFail(error));
			});
	}
}

const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};

const fetchOrdersSuccess = (orderList) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orderList,
	};
};

const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error,
	}
}

export const fetchOrders = (token) => {
	return dispatch => {
		dispatch(fetchOrdersStart());

		axios.get('/orders.json?auth=' + token)
			.then(response => {
				const fetchedOrders = [];

				for (let key in response.data) {
					fetchedOrders.push({
						id: key,
						...response.data[key],
					})
				}
				dispatch(fetchOrdersSuccess(fetchedOrders))
			})
			.catch(error => {
				dispatch(fetchOrdersFail(error));
				console.log(error);
		});
	}
}