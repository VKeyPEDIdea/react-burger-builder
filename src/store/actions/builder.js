import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientType) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		payload: { ingredientType },
	};
};

export const removeIngredient = (ingredientType) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		payload: { ingredientType },
	};
};

export const setIngredients = () => {
	return dispatch => {
		axios.get('ingredients.json')
			.then(response => {
				dispatch(initListIngredient(response.data));
			})
			.catch(error => {
				dispatch(fetchIngredientsFailed());
			})
	}
}

export const initListIngredient = (ingredients) => {
	return {
		type: actionTypes.INIT_LIST_INGREDIENTS,
		payload: { ingredients },
	};
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	};
};

export const settingIngredientsComplete = () => {
	return {
		type: actionTypes.SETTING_INGREDIENTS_COMPLETE,
	};
};