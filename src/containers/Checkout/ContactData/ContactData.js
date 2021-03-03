import React from "react";

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input';
import { connect } from "react-redux";
import * as actions from '../../../store/actions/';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class ContactData extends React.Component {
	state = {
		orderForm: {
			name: {
				elType: 'input',
				elConfig: {
					type: 'text',
					label: 'Name',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true,
					isValid: false,
					touched: false,
				},
			},
			street: {
				elType: 'input',
				elConfig: {
					type: 'text',
					label: 'Street',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true,
					isValid: false,
					touched: false,
				},
			},
			zipCode: {
				elType: 'input',
				elConfig: {
					type: 'text',
					label: 'Postal code',
					placeholder: 'Postal Code'
				},
				value: '',
				validation: {
					required: true,
					isValid: false,
					touched: false,
					minLength: 5,
					maxLength: 6,
				},
			},
			country: {
				elType: 'input',
				elConfig: {
					type: 'text',
					label: 'Country',
					placeholder: 'Your Country'
				},
				value: '',
				validation: {
					required: true,
					isValid: false,
					touched: false,
				},
			},
			city: {
				elType: 'input',
				elConfig: {
					type: 'text',
					label: 'City',
					placeholder: 'Your city'
				},
				value: '',
				validation: {
					required: true,
					isValid: false,
					touched: false,
				},
			}, 
			email: {
				elType: 'input',
				elConfig: {
					type: 'email',
					label: 'Email',
					placeholder: 'Your email address'
				},
				value: '',
				validation: {
					required: true,
					isValid: false,
					touched: false,
				},
			},
			deliveryMethod: {
				elType: 'select',
				elConfig: {
					label: 'Delivery method',
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'},
					]
				},
				value: 'fastest',
				validation: {
					required: false,
					isValid: true,
				}
			},
		},
		formIsReady: false,
	}

	orderHandler = e => {
		e.preventDefault();

		const formData = {};

		for (let formElementId in this.state.orderForm) {
			formData[formElementId] = this.state.orderForm[formElementId].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
			userId: this.props.userId,
		};

		this.props.onOrderBurger(order, this.props.token);
	}

	checkValidity(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	inputChangeHandler = (event, id) => {
		const updatedOrderForm = {...this.state.orderForm};
		const updatedFormElement = { ...updatedOrderForm[id] };
		updatedFormElement.value = event.target.value;
		updatedFormElement.validation.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.validation.touched = true;
		updatedOrderForm[id] = updatedFormElement;
		
		let formIsReady = true;

		for (let inputId in updatedOrderForm) {
			formIsReady = updatedOrderForm[inputId].validation.isValid && formIsReady;
		}

		this.setState({orderForm: {...updatedOrderForm}, formIsReady});
	}

	render() {
		let formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}

		const inputList = formElementsArray.map(input => {
			return <Input
				key={input.id}
				shouldValidate={input.config.validation.required}
				touched={input.config.validation.touched}
				isValid={input.config.validation.isValid}
				elType={input.config.elType}
				elConfig={input.config.elConfig}
				label={input.config.elConfig.label}
				value={input.config.value}
				changed={(event) => this.inputChangeHandler(event, input.id)}/>
		});

		let form = (
			<form>
				{inputList}
				<Button
					btnType='Success'
					disabled={!this.state.formIsReady}
					clicked={this.orderHandler}>Order</Button>
		</form>
		);

		if (this.props.loading) {
			form = <Spinner />
		}

		return(
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));