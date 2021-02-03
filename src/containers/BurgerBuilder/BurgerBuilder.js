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
			salad: 1,
			bacon: 2,
			cheese: 2,
			meat: 1,
		},
		totalPrice: 4,
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
	}

	removeIngredientHandler = type => {

	}
	 
	render() {
		return(
			<>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls
					ingredients={this.state.ingredients}
					ingredientAdded={this.addIngredientHandler}
				/>
			</>
		);
	}
}

export default BurgerBuilder;