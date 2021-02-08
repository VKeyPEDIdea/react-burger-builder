import React from "react";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRCIES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 2.1,
	bacon: 1.7,
};

class BurgerBuilder extends React.Component {
	state = {
		ingredients: null,
		totalPrice: 0,
		purchaseble: false,
		toOrder: false,
		loading: false,
		error: false,
	}

	componentDidMount() {
		axios.get('ingredients.json')
			.then(response => {
				this.setState({ingredients: response.data});
			})
			.catch(error => {
				this.setState({
					error: true,
				})
			}) ;
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
	}

	toOrderHandler = () => {
		this.setState({
			toOrder: true,
		});
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

	purchaseCancelHandler = () => {
		this.setState({
			toOrder: false,
		});
	}

	purchaseContinueHandler = () => {
		// alert('You continue!');
		this.setState({
			loading: true,
		});

		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Pavel Karyapkin',
				address: {
					country: 'Russia',
					city: 'Moscow', 
					street: 'Mira 1',
					zipCode: '100000',
				},
				email: 'test@test.com',
			},
			deliveryMethod: 'courier',
		}

		axios.post('/orders', order)
			.then(response => {
				this.setState({
					loading: false,
					toOrder: false,
				});
			})
			.catch(error => {
				this.setState({
					loading: false,
					toOrder: false,
				});
			});
	}
	 
	render() {
		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null;
		let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

		if (this.state.ingredients) {
			burger = (
				<>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls
					ingredients={this.state.ingredients}
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchaseble={this.state.purchaseble}
					toOrder={this.toOrderHandler} />
				</>
			);

			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContnuied={this.purchaseContinueHandler}
					price={this.state.totalPrice.toFixed(2)}/>
			);
		}
		
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return(
			<>
				<Modal
					show={this.state.toOrder}
					modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);