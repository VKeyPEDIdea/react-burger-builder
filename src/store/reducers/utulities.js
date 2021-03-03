const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 2.1,
	bacon: 1.7,
};

export function updatePurchaseState(ingredients) {
	const sum = Object.keys(ingredients)
		.map(key => {
			return ingredients[key];
		})
		.reduce((sum, number) => {
			return sum + number;
		}, 0);
	return sum > 0;
};

export function updateObject(object, newProps) {
	return {
		...object,
		...newProps,
	};
};

export function changeIngredientCount(state, action, isAddition) {
	const ingredientType = action.payload ? action.payload.ingredientType : null;
	const oldPrice = state.totalPrice;
	let oldCount = (state.ingredients && state.ingredients[ingredientType]) ? state.ingredients[ingredientType] : 0;
	let updatedIngredients = { ...state.ingredients };
	let priceDiff = null;
	let updatedProps = null;

	updatedIngredients[ingredientType] = isAddition ? oldCount + 1 : oldCount - 1;
	priceDiff = INGREDIENT_PRICES[ingredientType];

	updatedProps = {
		ingredients: updatedIngredients,
		totalPrice: isAddition ? oldPrice + priceDiff : oldPrice - priceDiff,
		purchaseble: updatePurchaseState(updatedIngredients),
		building: true,
	}

	return updatedProps;
};