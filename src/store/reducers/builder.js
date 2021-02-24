import * as actionTypes from '../actions/actionTypes'; 

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 2.1,
	bacon: 1.7,
};

const initialState = {
	ingredients: null,
	totalPrice: 0,
	purchaseble: false,
	error: false,
};

function updatePurchaseState(ingredients) {
	const sum = Object.keys(ingredients)
		.map(key => {
			return ingredients[key];
		})
		.reduce((sum, number) => {
			return sum + number;
		}, 0);
	return sum > 0;
}

const reducer = (state = initialState, action) => {
	const ingredientType = action.payload ? action.payload.ingredientType : null;
	let oldCount = (state.ingredients && state.ingredients[ingredientType]) ? state.ingredients[ingredientType] : 0;
	const oldPrice = state.totalPrice;
	let updatedCount = null;
	let updatedIngredients = { ...state.ingredients };
	let newPrice = null;

	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			updatedCount = oldCount + 1;
			updatedIngredients[ingredientType] = updatedCount;
			const priceAddition = INGREDIENT_PRICES[ingredientType];
			newPrice = oldPrice + priceAddition;

			return {
				ingredients: updatedIngredients,
				totalPrice: newPrice,
				purchaseble: updatePurchaseState(updatedIngredients)
			};

		case actionTypes.REMOVE_INGREDIENT:
			if (oldCount <= 0) {
				return state;
			}
			updatedCount = oldCount - 1;
			updatedIngredients[ingredientType] = updatedCount;
			const priceDeduction = INGREDIENT_PRICES[ingredientType];
			newPrice = oldPrice - priceDeduction;

			return {
				ingredients: updatedIngredients,
				totalPrice: newPrice,
				purchaseble: updatePurchaseState(updatedIngredients)
			};

		case actionTypes.INIT_LIST_INGREDIENTS:
			updatedIngredients = action.payload.ingredients
			return {
				...state,
				ingredients: updatedIngredients,
				error: false,
			}
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true,
			}
		default: 
			return state;
	}
	
}

export default reducer;