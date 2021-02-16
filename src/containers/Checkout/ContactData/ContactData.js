import React from "react";

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input';

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
				value: '',
			},
		},
		loading: false,
	}

	orderHandler = e => {
		e.preventDefault();
		this.setState({
			loading: true,
		});

		const formData = {};

		for (let formElementId in this.state.orderForm) {
			formData[formElementId] = this.state.orderForm[formElementId].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		}

		axios.post('/orders.json', order)
			.then(response => {
				this.setState({
					loading: false,
				});
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({
					loading: false,
				});
			});
	}

	checkValidity(value, rules) {
		let isValid = false;

		if (rules.required) {
			isValid = value.trim() !== '';
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength;
		}

		return isValid;
	}

	inputChangeHandler = (event, id) => {
		const updatedOrderForm = {...this.state.orderForm};
		const updatedFormElement = { ...updatedOrderForm[id] };
		updatedFormElement.value = event.target.value;
		updatedFormElement.validation.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedOrderForm[id] = updatedFormElement;
		console.log(updatedFormElement);

		this.setState({orderForm: {...updatedOrderForm}});
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
				elType={input.config.elType}
				elConfig={input.config.elConfig}
				label={input.config.elConfig.label}
				value={input.config.value}
				changed={(event) => this.inputChangeHandler(event, input.id)}/>
		});

		let form = (
			<form>
				{/* <Input elType='...' elConfig='...' value='...' /> */}
				{inputList}
				<Button
					btnType='Success'
					clicked={this.orderHandler}>Order</Button>
		</form>
		);

		if (this.state.loading) {
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

export default ContactData;