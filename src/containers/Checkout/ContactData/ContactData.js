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
			},
			street: {
				elType: 'input',
				elConfig: {
					type: 'text',
					label: 'Street',
					placeholder: 'Street'
				},
				value: '',
			},
			zipCode: {
				elType: 'input',
				elConfig: {
					type: 'text',
					label: 'Postal code',
					placeholder: 'Postal Code'
				},
				value: '',
			},
			country: {
				elType: 'input',
				elConfig: {
					type: 'text',
					label: 'Country',
					placeholder: 'Your Country'
				},
				value: '',
			},
			city: {
				elType: 'input',
				elConfig: {
					type: 'text',
					label: 'City',
					placeholder: 'Your city'
				},
				value: '',
			}, 
			email: {
				elType: 'input',
				elConfig: {
					type: 'email',
					label: 'Email',
					placeholder: 'Your email address'
				},
				value: '',
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

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
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
				value={input.config.value}/>
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