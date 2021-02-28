import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { purchaseBurgerComplete } from '../../store/actions';

class Checkout extends React.Component {
	checkoutCancelHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinueHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	componentWillUnmount() {
		this.props.purchaseCompleteHandler();
	}

	render() {
		let summary = <Redirect to='/'/>;

		if (this.props.ingredients) {
			summary = this.props.isPurchased ? <Redirect to='/'/> : (
			<div>
				<CheckoutSummary
					ingredients={this.props.ingredients}
					onCheckoutCanceled={this.checkoutCancelHandler}
					onCheckoutContinued={this.checkoutContinueHandler}/>
				<Route
					path={this.props.match.url + '/contact-data'}
					render={(props) => <ContactData
						ingredients={this.props.ingredients}
						price={this.props.totalPrice}
						{...props}/>}/>
				</div>)
		};
		
		return (
			<>
				{summary}
			</>
			);
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		isPurchased: state.order.isPurchased,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		purchaseCompleteHandler: () => dispatch(purchaseBurgerComplete()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);