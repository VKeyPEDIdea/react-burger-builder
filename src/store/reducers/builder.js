import * as actionTypes from '../actions/actionTypes';
import {
	updateObject,
	changeIngredientCount,
 } from './utulities';

const initialState = {
	ingredients: null,
	totalPrice: 0,
	purchaseble: false,
	error: false,
	building: false,
};

const reducer = (state = initialState, action) => {
	let updatedProps = null;

	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			updatedProps = changeIngredientCount(state, action, true);
			return updateObject(state, updatedProps);

		case actionTypes.REMOVE_INGREDIENT:
			updatedProps = changeIngredientCount(state, action);
			return updateObject(state, updatedProps);

		case actionTypes.INIT_LIST_INGREDIENTS:
			updatedProps = {
				ingredients: action.payload.ingredients,
				error: false,
				totalPrice: 0,
				building: false,
			};

			return updateObject(state, updatedProps);

		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return updateObject(state, { error: true });

		case actionTypes.SETTING_INGREDIENTS_COMPLETE:
			return updateObject(state, {
				purchaseble: false,
			});

		default: 
			return state;
	}
	
}

export default reducer;