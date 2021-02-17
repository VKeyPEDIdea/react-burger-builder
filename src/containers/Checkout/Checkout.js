import React from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
	state = {
		ingredients: {
			salad: 1,
			cheese: 1,
			meat: 1,
			bacon: 1,
		},
		totalPrice: 0
	}

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = null;

		for (let param of query.entries()) {
			if (param[0] === 'price') {
				price = param[1];
			} else {
				ingredients[param[0]] = +param[1];
			}
		}

		this.setState({ingredients, totalPrice: price})
	}

	checkoutCancelHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinueHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render() {
		return (
			<>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					onCheckoutCanceled={this.checkoutCancelHandler}
					onCheckoutContinued={this.checkoutContinueHandler}/>
				<Route
					path={this.props.match.url + '/contact-data'}
					render={(props) => <ContactData
						ingredients={this.state.ingredients}
						price={this.state.totalPrice}
						{...props}/>}/>
			</>
			);
	}
}

export default Checkout;