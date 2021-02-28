import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utulities';

const initialState = {
	orders: [],
	loading: false,
	isPurchased: false,
}

const reducer = (state = initialState, action) => {
	let updatedProps = null;

	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_START:
			return updateObject(state, {loading: true, isPurchased: false,});

		case actionTypes.PURCHASE_BURGER_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.orderId,
			};

			updatedProps = {
				loading: false,
				orders: state.orders.concat(newOrder),
				isPurchased: true,
			}
			
			return updateObject(state, updatedProps);

		case actionTypes.PURCHASE_BURGER_FAIL:
			return updateObject(state, { loading: false });

		case actionTypes.PURCHASE_BURGER_COMPLETED:
			return updateObject(state, { isPurchased: false });
			
		case actionTypes.FETCH_ORDERS_START:
			return updateObject(state, { loading: true });

		case actionTypes.FETCH_ORDERS_SUCCESS:
			updatedProps = {
				loading: false,
				orders: action.orders
			}
			return updateObject(state, updatedProps);

		case actionTypes.FETCH_ORDERS_FAIL:
			return updateObject(state, { error: action.error });

		default:
			return state;
	}
};

export default reducer;