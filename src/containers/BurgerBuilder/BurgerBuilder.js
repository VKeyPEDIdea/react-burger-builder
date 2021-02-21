import React from "react";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends React.Component {
	state = {
		toOrder: false,
		loading: false,
		error: false,
	}

	componentDidMount() {
		axios.get('ingredients.json')
			.then(response => {
				this.props.loadIngredientsHandler(response.data);
			})
			.catch(error => {
				this.setState({
					error: true,
				})
			}) ;
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
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		};

		queryParams.push('price=' + this.props.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString,
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
		ingredients: state.ingredients,
		totalPrice: state.totalPrice,
		isPurchaseble: state.purchaseble,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addIngredientHandler: (ingredientType) => dispatch({type: actionTypes.ADD_INGREDIENT, payload: {
			ingredientType,
		}}),
		removeIngredientHandler: (ingredientType) => dispatch({type: actionTypes.REMOVE_INGREDIENT, payload: {
			ingredientType,
		}}),
		loadIngredientsHandler: (ingredients) => dispatch({type: actionTypes.SET_LIST_INGREDIENTS, payload: {
			ingredients,
		}})
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)); 