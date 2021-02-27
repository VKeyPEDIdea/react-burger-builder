import React from "react";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as builderActions from '../../store/actions/';

class BurgerBuilder extends React.Component {
	state = {
		toOrder: false,
	}

	componentDidMount() {
		this.props.initIngredientsHandler();
	}

	toOrderHandler = () => {
		this.setState({
			toOrder: true,
		});
	}

	purchaseCancelHandler = () => {
		this.setState({
			toOrder: false,
		});
	}

	purchaseContinueHandler = () => {
		this.props.history.push({
			pathname: '/checkout',
		});
		this.props.settingCompleteHandler();
	}
	 
	render() {
		const disabledInfo = {
			...this.props.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null;
		let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

		if (this.props.ingredients) {
			burger = (
				<>
				<Burger ingredients={this.props.ingredients}/>
				<BuildControls
					ingredients={this.props.ingredients}
					ingredientAdded={this.props.addIngredientHandler}
					ingredientRemoved={this.props.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.props.totalPrice}
					purchaseble={this.props.isPurchaseble}
					toOrder={this.toOrderHandler} />
				</>
			);

			orderSummary = (
				<OrderSummary
					ingredients={this.props.ingredients}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContnuied={this.purchaseContinueHandler}
					price={this.props.totalPrice.toFixed(2)}/>
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

const mapStateToProps = state => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		isPurchaseble: state.burgerBuilder.purchaseble,
		error: state.burgerBuilder.error,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addIngredientHandler: (ingredientType) => dispatch(builderActions.addIngredient(ingredientType)),
		removeIngredientHandler: (ingredientType) => dispatch(builderActions.removeIngredient(ingredientType)),
		initIngredientsHandler: () => dispatch(builderActions.setIngredients()),
		settingCompleteHandler: () => dispatch(builderActions.settingIngredientsComplete()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)); 