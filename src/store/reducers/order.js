import * as actionTypes from '../actions/actionTypes';

const initialState = {
	orders: [],
	loading: false,
	isPurchased: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_START:
			return {
				...state,
				loading: true,
				isPurchased: false,
			};
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.orderId,
			};
			
			return {
				...state,
				loading: false,
				orders: state.orders.concat(newOrder),
				isPurchased: true,
			};
		case actionTypes.PURCHASE_BURGER_FAIL:
			return {
				...state,
				loading: false,
			}
		case actionTypes.PURCHASE_BURGER_COMPLETED:
			return {
				...state,
				isPurchased: false,
			}
		default:
			return state;
	}
};

export default reducer;