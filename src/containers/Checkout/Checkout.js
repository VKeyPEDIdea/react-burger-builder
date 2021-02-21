import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
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
					ingredients={this.props.ingredients}
					onCheckoutCanceled={this.checkoutCancelHandler}
					onCheckoutContinued={this.checkoutContinueHandler}/>
				<Route
					path={this.props.match.url + '/contact-data'}
					render={(props) => <ContactData
						ingredients={this.props.ingredients}
						price={this.props.totalPrice}
						{...props}/>}/>
			</>
			);
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
		totalPrice: state.totalPrice,
	};
};

export default connect(mapStateToProps)(Checkout);