import React from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import Burger from "../../components/Burger/Burger";

const INGREDIENT_PRCIES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 2.1,
	bacon: 1.7,
};

class BurgerBuilder extends React.Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
		purchaseble: false,
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(key => {
				return ingredients[key];
			})
			.reduce((sum, number) => {
				return sum + number;
			}, 0);
		this.setState({
			purchaseble: sum > 0,
		});
		console.log('Sum: ', sum);
		console.log(this.state.ingredients);
	}

	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRCIES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
		console.log('count: ', this.state.ingredients);
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRCIES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseState(updatedIngredients);
	}
	 
	render() {
		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		return(
			<>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls
					ingredients={this.state.ingredients}
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchaseble={this.state.purchaseble}
				/>
			</>
		);
	}
}

export default BurgerBuilder;