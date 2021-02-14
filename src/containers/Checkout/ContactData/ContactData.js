import React from "react";

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends React.Component {
	state = {
		name: '',
		email: '',
		address: {
			country: '',
			city: '', 
			street: '',
			zipCode: '',
		},
		loading: false,
	}

	orderHandler = e => {
		e.preventDefault();
		this.setState({
			loading: true,
		});

		const order = {
			ingredients: this.state.ingredients,
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
		let form = (
			<form>
				<input className={classes.Input} type='text' name='name' placeholder='Your Name' />
				<input className={classes.Input} type='email' name='email' placeholder='Your Mail address' />
				<input className={classes.Input} type='text' name='street' placeholder='street' />
				<input className={classes.Input} type='text' name='postalCode' placeholder='Postal Code' />
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